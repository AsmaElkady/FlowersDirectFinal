import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

function ImageUpload() {
    const { setValue, watch, formState: { errors } } = useFormContext();
    const image = watch("image");

    //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.currentTarget.value.split("\\").pop();
    //     if (file) {
    //       setValue("image", `/src/assets/${file}`);
    //     }
    //   };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setValue("image", base64, { shouldValidate: true });
        };
        reader.readAsDataURL(file);
    };
    return (
        <>
            <h4 className="mb-3">Upload Product Image</h4>
            <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange} />
            {image && (
                <div className="mt-3">
                    <img src={image} alt="preview" width={120} />
                </div>
            )}
            {errors.image && (
                <small className="text-danger">
                    {errors.image.message?.toString()}
                </small>
            )}
        </>
    )
}

export default ImageUpload
