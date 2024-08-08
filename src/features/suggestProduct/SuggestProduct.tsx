import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/api.ts";

interface ProductSuggestion {
    title: string;
    price: number;
    description: string;
    category: string;
}

const SuggestProductForm = () => {
    const categoriesQuery = useQuery<string[]>({
        queryKey: ['categories'],
        queryFn: getAllCategories
    });

    const formik = useFormik<ProductSuggestion>({
        initialValues: {
            title: '',
            price: 0,
            description: '',
            category: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            price: Yup.number().required('Price is required').positive('Price must be positive'),
            description: Yup.string().required('Description is required'),
            category: Yup.string().required('Category is required')
        }),
        onSubmit: (values) => {
            console.log('Form values:', values);
            alert('Product suggested successfully!');
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className="p-4 shadow-lg rounded-lg bg-base-100">
            <h1 className="text-4xl mb-4">Suggest a Product</h1>

            <div className="mb-4">
                <label htmlFor="title" className="block">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-500 text-sm">{formik.errors.title}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label htmlFor="price" className="block">Price</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {formik.touched.price && formik.errors.price ? (
                    <div className="text-red-500 text-sm">{formik.errors.price}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block">Description</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-500 text-sm">{formik.errors.description}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label htmlFor="category" className="block">Category</label>
                <select
                    id="category"
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                >
                    <option value="" label="Select category" />
                    {categoriesQuery.data?.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {formik.touched.category && formik.errors.category ? (
                    <div className="text-red-500 text-sm">{formik.errors.category}</div>
                ) : null}
            </div>

            <button
                type="submit"
                className="w-full btn btn-neutral">
                Submit
            </button>
        </form>
    );
}

export default SuggestProductForm;
