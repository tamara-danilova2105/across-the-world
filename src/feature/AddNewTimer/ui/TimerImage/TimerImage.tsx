// import { get, useFormContext } from "react-hook-form"
// import { Stack } from "@/shared/ui/Stack"
// import { Text } from "@/shared/ui/Text"
// import { Input } from "@/shared/ui/Input"
// import { Button } from "@/shared/ui/Button"
// import { ImageUploader } from "@/entities/ImageUploader"
// import { Image } from "@/shared/types/types"
// import { Details, getPlaceholder } from "../../types/types"
// import { data } from "@/shared/lib/validateInput"
// import styles from './TimerImage.module.scss'

// interface ImageCoverInputProps {
//     imagesWithDetails: { image: Image[], details: Details[] }[];
//     handleImagesChange: (imagesWithDetails: { image: Image[], details: Details[] }[]) => void;
//     handleAddCover: (imagesWithDetails: { image: Image[], details: Details[] }[]) => void;
// }

// export const TimerImage = ({ imagesWithDetails, handleImagesChange }: ImageCoverInputProps) => {
//     const { register, watch, formState: { errors }, reset } = useFormContext();

//     const header = watch('header');
//     const category = watch('category');
//     const describe = watch('describe');

//     const handleImagesChange = (image: Image[]) => {
//         const updatedImagesWithDetails = image.map(img => ({
//             _id: img._id,
//             src: img.src,
//             file: img.file 
//         }))

//         onChange(updatedImagesWithDetails);
//     }

//     const handleAddClick = () => {
//         if (!header || !category || !describe) {
//             return; 
//         }
//         const updatedImagesWithDetails = [...imagesWithDetails];

//         updatedImagesWithDetails.push({
//             image: "", 
//             details: { header, category, describe }
//         });

//         onChange(updatedImagesWithDetails);

//         reset({ header: '', category: '', describe: '' }); // Очищаем форму
//     };

//     return (
//         <Stack direction="column" gap="24">
//             {imagesWithDetails.map((item, index) => (
//                 <Stack key={index} direction="column" gap="16" >
//                     <Text size="16" font="geometria500">
//                         Обложка {index + 1}
//                     </Text>
//                     <img src={item.image} alt={item.details.header} className={styles.image} />
//                     <Text>Название: {item.details.header}</Text>
//                     <Text>Категория: {item.details.category}</Text>
//                     <Text>Описание: {item.details.describe}</Text>
//                 </Stack>
//             ))}

//             {imagesWithDetails.length < 2 && (
//                 <Stack direction="column" gap="24">
//                     <Text size="18" font="geometria500">
//                         Новая обложка таймера {imagesWithDetails.length + 1}
//                     </Text>

//                     <ImageUploader
//                         images={image.map(img => ({
//                             _id: img._id,
//                             src: img.src,
//                             file: img.file,
//                         }))}
//                         onChange={handleImagesChange}
//                         maxImages={1}
//                         isCover
//                     />
//                     <Input
//                         label="Название"
//                         name="header"
//                         register={register('header', { required: data.required })}
//                         placeholder={getPlaceholder('header')}
//                         error={get(errors, 'header')}
//                     />
//                     <Input
//                         label="Категория"
//                         name="category"
//                         register={register('category', { required: data.required })}
//                         placeholder={getPlaceholder('category')}
//                         error={get(errors, 'category')}
//                     />
//                     <Input
//                         label="Краткое описание"
//                         name="describe"
//                         register={register('describe', { required: data.required })}
//                         placeholder={getPlaceholder('describe')}
//                         error={get(errors, 'describe')}
//                     />
//                     <Button
//                         onClick={handleAddClick}
//                         type="button"
//                         disabled={!header || !category || !describe}
//                     >
//                         Добавить обложку
//                     </Button>
//                 </Stack>
//             )}
//         </Stack>
//     )
// };

