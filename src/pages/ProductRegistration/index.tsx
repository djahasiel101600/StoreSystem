import { useForm, type Resolver } from "react-hook-form";
import type { item } from "../../shared/types/item";
import { useSearchParams } from 'react-router-dom';



const resolver: Resolver<item> = async (values) => {
    return {
        values: values.code ? values : {},
        errors: !values.code ? {
            code: {
                type: 'required',
                message: 'code is required'
            }
        } : {}
    }
}
const ProductRegistrationPage = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    const {register, handleSubmit, formState: {errors}} = useForm<item>({resolver})
    const onSubmit = handleSubmit((data) => alert(data))
    return(
        <form onSubmit={onSubmit} style={{display:"flex", flexDirection:"column", gap:10, padding:"10px"}}>
            <input {...register('code')} type="text" placeholder="barcode" value={code || ""} />
            <input {...register('name')} type="text" placeholder="name" />
            <input {...register('description')} type="text" placeholder="description" />
            <input {...register('price')} type="number" placeholder="price" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default ProductRegistrationPage;