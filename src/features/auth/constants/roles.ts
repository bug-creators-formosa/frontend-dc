export const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
} as const;

export const ROLE_NAMES = Object.values(ROLES);

export type Roles = typeof ROLES[keyof typeof ROLES];