import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { ArrowLeft } from 'lucide-react'
import ProductForm from '../components/ProductForm'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к списку
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {id ? 'Редактировать товар' : 'Добавить новый товар'}
        </h1>
        <div className="max-w-2xl mx-auto">
          <ProductForm id={id ? parseInt(id) : undefined} />
        </div>
      </div>
    </div>
  )
}

