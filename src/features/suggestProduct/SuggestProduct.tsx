import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useQuery} from "@tanstack/react-query";
import {getAllCategories} from "../../services/api.ts";
import {useNavigate} from "react-router-dom";
import {ProductSuggestion} from "../../models/Products.ts";

const SuggestProductForm = () => {
    const categoriesQuery = useQuery<string[]>({
        queryKey: ['categories'], queryFn: getAllCategories
    });

    const navigate = useNavigate();

    const formik = useFormik<ProductSuggestion>({
        initialValues: {
            title: '', price: 0.00, description: '', category: ''
        }, validationSchema: Yup.object({
            title: Yup.string()
                .required('Title is required')
                .min(3, 'Title must be at least 3 characters'), price: Yup.number()
                .required('Price is required')
                .positive('Price must be positive'), description: Yup.string()
                .required('Description is required')
                .min(5, 'Description must be at least 5 characters'), category: Yup.string()
                .required('Category is required')
        }), onSubmit: (values) => {
            alert(`${values.title} Product suggested successfully!`);
            navigate('/');
        }
    });

    return (<div className="w-full flex justify-center p-4">
        <form onSubmit={formik.handleSubmit} className="p-4 shadow-xl rounded-lg bg-base-100 w-full md:w-1/3">
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
                {formik.touched.title && formik.errors.title && (
                    <div className="text-red-500 text-sm">{formik.errors.title}</div>)}
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
                {formik.touched.price && formik.errors.price && (
                    <div className="text-red-500 text-sm">{formik.errors.price}</div>)}
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
                {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm">{formik.errors.description}</div>)}
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
                    <option value="" label="Select category"/>
                    {categoriesQuery.data?.map((category) => (<option key={category} value={category}>
                        {category}
                    </option>))}
                </select>
                {formik.touched.category && formik.errors.category && (
                    <div className="text-red-500 text-sm">{formik.errors.category}</div>)}
            </div>
            <button
                type="submit"
                className="w-full btn btn-primary">
                Submit
            </button>
        </form>
    </div>);
}

export default SuggestProductForm;