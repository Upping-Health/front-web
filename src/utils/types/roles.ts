export const ROLE = {
  SUPERADMIN: 1,
  ADMIN: 2,
  NUTRITIONIST: 3,
} as const

export const ROLE_PTBR = {
  [ROLE.SUPERADMIN]: 'Super Admin',
  [ROLE.ADMIN]: 'Administrador',
  [ROLE.NUTRITIONIST]: 'Nutricionista',
}
