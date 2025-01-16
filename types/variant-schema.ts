import * as z from "zod"

export const VariantSchema = z.object({
    productID : z.number(),
    id: z.number().optional(),
    editMode: z.boolean(),
    color: z.string().min(3,{message: "Please enter at least 3 character"}),
    tags: z.array(
        z.string().min(3,{message: "Please enter at least 3 character"})
    ),
    productType: z.string().min(3,{message: "Please enter at least 3 character"}),
    variantImages: z.array(
        z.object({
            url: z.string().url({message: "Please enter a valid image url"}),
            size: z.number(),
            key: z.string().optional(),
            id: z.number().optional(),
            name: z.string(),
            
        })
    )
})