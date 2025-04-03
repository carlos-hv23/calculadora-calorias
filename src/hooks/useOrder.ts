import { useState } from 'react';
import type { MenuItem, OrderItem } from '../types';

export default function useOrder() {
    const [order, setOrder] = useState<OrderItem[]>([]);
    const [tip, setTip] = useState(0);

    function addItem(item: MenuItem) {
        
        const itemExists = order.find(orderItem => orderItem.id === item.id)
        if (itemExists) {
            const updeteOrder = order.map(orderItem => orderItem.id === item.id ? {...orderItem, quantity: orderItem.quantity + 1} : orderItem)
            setOrder(updeteOrder)
        } else {
            const newItem = {...item, quantity: 1}
            setOrder([...order, newItem])
        }
    }

    function removeItem(id: MenuItem['id']){
        const updatedOrder = order.filter(item => item.id !== id)
        setOrder(updatedOrder)
    }

    function placeOrder() {
        setOrder([])
        setTip(0)
    }

    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder
    }
}