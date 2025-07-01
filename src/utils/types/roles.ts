export const ROLE = {
  SUPERADMIN: 'superAdmin',
  ADMIN: 'admin',
  NUTRITIONIST: 'nutritionist',
} as const

export const ROLE_PTBR = {
  [ROLE.SUPERADMIN]: 'Super Admin',
  [ROLE.ADMIN]: 'Administrador',
  [ROLE.NUTRITIONIST]: 'Nutricionista',
}
