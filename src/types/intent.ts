export const billingIntent = "billing" as const
export const supportIntent = "support" as const
export const unknownIntent = "unknown" as const

export type Intent = typeof billingIntent | typeof supportIntent | typeof unknownIntent