// import { useState } from 'react';
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
// import { ProductForm } from './ProductForm';
// import { Product, ProductCreate } from '../lib/types';
// import { Button } from './ui/button';
// import { api } from '../lib/api';

// interface ProductSheetProps {
//   product: Product;
//   isOpen: boolean;
//   onClose: () => void;
//   onUpdate: (product: ProductCreate) => void;
//   onDelete: (id: number) => void;
// }

// export function ProductSheet({ product, isOpen, onClose, onUpdate, onDelete }: ProductSheetProps) {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleSubmit = (data: ProductCreate) => {
//     onUpdate({ ...data, id: product.id });
//     setIsEditing(false);
//   };

//   const handleDelete = () => {
//     onDelete(product.id);
//     onClose();
//   };

//   return (
//     <Sheet open={isOpen} onOpenChange={onClose}>
//       <SheetContent className="sm:max-w-md">
//         <SheetHeader>
//           <SheetTitle className="text-2xl font-bold text-blue-600">{isEditing ? 'Редактирование товара' : product.name}</SheetTitle>
//           <SheetDescription>
//             {isEditing ? 'Измените детали товара' : 'Детали товара'}
//           </SheetDescription>
//         </SheetHeader>
//         {isEditing ? (
//           <ProductForm 
//             product={product} 
//             onSubmit={handleSubmit} 
//             onDelete={handleDelete}
//             onCancel={() => setIsEditing(false)}  
//           />
//         ) : (
//           <div className="space-y-6 mt-6">
//             <div className="relative w-full h-64 overflow-hidden rounded-lg">
//               <img 
//                 src={api.getImageUrl(product.id) || "/placeholder.svg"}
//                 alt={product.name} 
//                 className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
//               />
//             </div>
//             <p className="text-lg"><strong className="text-blue-600">Описание:</strong> {product.description}</p>
//             <p className="text-lg"><strong className="text-blue-600">Тип модели:</strong> {product.modelType}</p>
//             <Button onClick={() => setIsEditing(true)} className="w-full bg-blue-500 hover:bg-blue-600 text-white">Редактировать</Button>
//           </div>
//         )}
//       </SheetContent>
//     </Sheet>
//   );
// }

