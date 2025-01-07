import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductStore, Product } from '../lib/products'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Save, Upload } from 'lucide-react'
import { Card, CardContent, CardFooter } from "./ui/card"
import { Combobox } from "./ui/combobox"

const productTypes = [
  { value: "Банка", label: "Банка" },
  { value: "Коробка", label: "Коробка" },
]

interface ProductFormProps {
  id?: number
}

export default function ProductForm({ id }: ProductFormProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('/placeholder.svg')
  const [type, setType] = useState('')
  
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore()
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      const product = products.find(p => p.id === id)
      if (product) {
        setName(product.name)
        setDescription(product.description)
        setImage(product.image)
        setType(product.type)
      }
    }
  }, [id, products])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!type) {
      toast({ title: "Ошибка", description: "Пожалуйста, выберите тип товара.", variant: "destructive" })
      return
    }
    if (id) {
      updateProduct(id, { name, description, image, type })
      toast({ title: "Товар обновлен", description: "Изменения сохранены успешно." })
    } else {
      addProduct({ name, description, image, type })
      toast({ title: "Товар добавлен", description: "Новый товар успешно добавлен." })
    }
    navigate('/')
  }

  const handleDelete = () => {
    if (id) {
      deleteProduct(id)
      toast({ title: "Товар удален", description: "Товар успешно удален из списка." })
      navigate('/')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Название</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full min-h-[100px]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Тип товара</Label>
            <Combobox options={productTypes} value={type} onChange={setType} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Изображение</Label>
            <div className="flex items-center space-x-4">
              <div className="relative w-32 h-32">
                <img
                  src={image}
                  alt="Product image"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  <Upload className="w-4 w-4" />
                  <span>Загрузить изображение</span>
                </div>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            <Save className="mr-2 h-4 w-4" />
            {id ? 'Обновить' : 'Добавить'} товар
          </Button>
          {id && (
            <Button type="button" variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Удалить товар
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}

