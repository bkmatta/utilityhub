const USERS_KEY = 'uh_registered_users';
const SESSION_KEY = 'user_session';

export interface StoredUser {
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface Session {
  name: string;
  email: string;
}

async function hashPassword(password: string, email: string): Promise<string> {
  const data = new TextEncoder().encode(email.toLowerCase() + ':' + password);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function register(name: string, email: string, password: string): Promise<void> {
  const users = getUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) throw new Error('An account with this email already exists.');
  const passwordHash = await hashPassword(password, email);
  users.push({ name: name.trim(), email: email.toLowerCase(), passwordHash, createdAt: new Date().toISOString() });
  saveUsers(users);
  const session: Session = { name: name.trim(), email: email.toLowerCase() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function login(email: string, password: string): Promise<void> {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error('No account found with this email address.');
  const passwordHash = await hashPassword(password, email);
  if (passwordHash !== user.passwordHash) throw new Error('Incorrect password. Please try again.');
  const session: Session = { name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): Session | null {
  try {
    const s = localStorage.getItem(SESSION_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

export function resetPassword(email: string, newPassword: string): Promise<boolean> {
  return (async () => {
    const users = getUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (idx === -1) return false;
    users[idx].passwordHash = await hashPassword(newPassword, email);
    saveUsers(users);
    return true;
  })();
}

export function accountExists(email: string): boolean {
  return getUsers().some((u) => u.email.toLowerCase() === email.toLowerCase());
}
