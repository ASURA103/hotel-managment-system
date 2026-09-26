import zod from "zod"

export const signupValidator = zod.object({
    name: zod.string(),
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
})

export const signinValidator = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

export const adminSigninValidator = zod.object({
    username: zod.string(),
    password: zod.string().min(6)
})

export const ownerSignupValidator = zod.object({
    name: zod.string(),
    phone: zod.number(),
    email: zod.string().email(),
    idProof: zod.string(),
    password: zod.string().min(6) 
})

export const ownerSigninValidator = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

// Form fields arrive as text (multipart), so accept "true"/"false" and numeric strings.
const formBoolean = zod.preprocess((v) => (v === "true" ? true : v === "false" ? false : v), zod.boolean())
const roomCount = zod.coerce.number().int().min(0)
const objectId = zod.string().regex(/^[0-9a-fA-F]{24}$/, "invalid id")

// The add-hotel form. The owner comes from the token, never from the body.
export const hotelvalidator = zod.object({
    name: zod.string().trim().min(1),
    area: zod.string().trim().min(1),
    city: zod.string().trim().min(1),
    state: zod.string().trim().min(1),
    price: zod.coerce.number().positive(),
    unmarriedFriendly: formBoolean,
    AcRoomA: formBoolean,
    NonAcRoomA: formBoolean,
    TotalAc: roomCount,
    TotalNonAc: roomCount,
})

// Edit hotel: any subset of the fields above, plus which hotel.
export const hotelUpdateValidator = hotelvalidator.partial().extend({
    id: objectId,
    status: formBoolean.optional(),
})

export const idValidator = zod.object({ id: objectId })

export const bookingValidator = zod.object({
    hotelId: objectId,
    fromDate: zod.coerce.date(),
    toDate: zod.coerce.date(),
    rooms: zod.coerce.number().int().min(1),
    RoomType: zod.enum(["AC", "NonAc"]),
}).refine((b) => b.toDate >= b.fromDate, { message: "check-out must be on or after check-in", path: ["toDate"] })