import { formatCurrency } from "../helpers"
import { OrderItem } from "../types"

type OrderContentsProps = {
    order: OrderItem[]
    removeItem: (id: OrderItem['id']) => void
}

export default function OrderContents({ order, removeItem }: OrderContentsProps) {
    return (
        <div>
            <h2 className="font-black text-4xl"> Consumo</h2>
            <div className="space-y-3 mt-5">
                {

                    order.map(item => (
                        <div key={item.id} className="flex justify-between border-b border-slate-300 py-3">
                            <div className="w-2/4">
                                <p>{item.name}</p>
                                <p className="text-gray-500">Cantidad: {item.quantity}</p>
                                <p className="text-gray-500">Precio Unitario: {formatCurrency(item.price)}</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <p className="font-black">{formatCurrency(item.price * item.quantity)}</p>
                            </div>
                            <button className="bg-red-500 text-white rounded-4xl w-8 h-8 font-black flex justify-center items-center self-center cursor-pointer"
                                onClick={() => removeItem(item.id)}>
                                x
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
