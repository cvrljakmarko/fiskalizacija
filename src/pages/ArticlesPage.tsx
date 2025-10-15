import { useState } from 'react'
import { useArticleCrud } from '@/hooks/useArticleCrud'
import type { Articles } from '@/types/articles'
import Button from '@/components/ui/Button'

export default function ArticlesPage() {
    const {
        articles,
        loading,
        error,
        success,
        createArticleItem,
        updateArticleItem,
        deleteArticleItem
    } = useArticleCrud()

    const [name, setName] = useState('')
    const [price, setPrice] = useState<number | ''>('')
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState<Articles | null>(
        null
    )
    const [editName, setEditName] = useState('')
    const [editPrice, setEditPrice] = useState<number | ''>('')

    // --- Handlers ---
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!name || price === '') return
        await createArticleItem({ name, price: Number(price) })
        setName('')
        setPrice('')
    }

    const openEditModal = (article: Articles) => {
        setSelectedArticle(article)
        setEditName(article.name)
        setEditPrice(article.price)
        setEditModalOpen(true)
    }

    const confirmEdit = async () => {
        if (!selectedArticle || editPrice === '' || !editName.trim()) return
        await updateArticleItem(selectedArticle.id, {
            name: editName,
            price: Number(editPrice)
        })
        closeModals()
    }

    const openDeleteModal = (article: Articles) => {
        setSelectedArticle(article)
        setDeleteModalOpen(true)
    }

    const confirmDelete = async () => {
        if (!selectedArticle) return
        await deleteArticleItem(selectedArticle)
        closeModals()
    }

    const closeModals = () => {
        setEditModalOpen(false)
        setDeleteModalOpen(false)
        setSelectedArticle(null)
    }

    // --- Render ---
    return (
        <section>
            <h1 className="text-2xl font-semibold mb-4">Articles</h1>

            {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
            {success && (
                <p className="mb-3 text-sm text-green-600">{success}</p>
            )}

            {/* Create Form */}
            <form
                className="flex flex-wrap items-end gap-2 mb-6"
                onSubmit={handleSubmit}
            >
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Name
                    </label>
                    <input
                        className="border rounded px-3 py-2 w-56"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Basic"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Price (EUR)
                    </label>
                    <input
                        className="border rounded px-3 py-2 w-32"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) =>
                            setPrice(
                                e.target.value === ''
                                    ? ''
                                    : Number(e.target.value)
                            )
                        }
                        placeholder="0.00"
                    />
                </div>

                <Button type="submit">Create</Button>
            </form>

            {/* Articles Table */}
            <div className="overflow-x-auto border rounded">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="text-left px-4 py-2">ID</th>
                            <th className="text-left px-4 py-2">Name</th>
                            <th className="text-left px-4 py-2">Price (€)</th>
                            <th className="text-right px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={4} className="px-4 py-3">
                                    Loading…
                                </td>
                            </tr>
                        )}

                        {!loading && (articles?.length ?? 0) === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-3">
                                    No items.
                                </td>
                            </tr>
                        )}

                        {!loading &&
                            articles?.map((article) => (
                                <tr key={article.id} className="border-t">
                                    <td className="px-4 py-2">{article.id}</td>
                                    <td className="px-4 py-2">
                                        {article.name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {article.price.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        <Button
                                            variant="secondary"
                                            className="mr-2"
                                            onClick={() =>
                                                openEditModal(article)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                openDeleteModal(article)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* --- Edit Modal --- */}
            {editModalOpen && (
                <Modal onClose={closeModals} title="Edit Article">
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Name
                            </label>
                            <input
                                className="border rounded px-3 py-2 w-full"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Price (EUR)
                            </label>
                            <input
                                className="border rounded px-3 py-2 w-full"
                                type="number"
                                step="0.01"
                                value={editPrice}
                                onChange={(e) =>
                                    setEditPrice(
                                        e.target.value === ''
                                            ? ''
                                            : Number(e.target.value)
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" onClick={closeModals}>
                            Cancel
                        </Button>
                        <Button onClick={confirmEdit}>Save</Button>
                    </div>
                </Modal>
            )}

            {/* --- Delete Modal --- */}
            {deleteModalOpen && selectedArticle && (
                <Modal onClose={closeModals} title="Confirm Deletion">
                    <p>
                        Are you sure you want to delete{' '}
                        <strong>{selectedArticle.name}</strong>?
                    </p>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="primary" onClick={closeModals}>
                            Cancel
                        </Button>
                        <Button variant="secondary" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </div>
                </Modal>
            )}
        </section>
    )
}

/** --- Simple Reusable Modal Component --- */
function Modal({
    title,
    children,
    onClose
}: {
    title: string
    children: React.ReactNode
    onClose: () => void
}) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
