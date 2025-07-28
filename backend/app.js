import fs from "node:fs/promises"

import bodyParser from "body-parser"
import express from "express"

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.get('/medications', async (req, res) => {
    const medications = await fs.readFile('./data/available-medications.json', 'utf-8')
    res.json(JSON.parse(medications))
})

app.post('/orders', async (req, res) => {
    const orderData = req.body.order

    if (orderData === null || orderData.items === null || orderData.items.length === 0){
        return res
            .status(400)
            .json({message: 'Alguns dados estão faltando.'})
    }

    if (
        orderData.customer.email === null || 
        !orderData.customer.email.includes('@') ||
        orderData.customer.name === null ||
        orderData.customer.name.trim() === '' ||
        orderData.customer.street === null ||
        orderData.customer.street.trim() === '' ||
        orderData.customer['postal-code'] === null ||
        orderData.customer['postal-code'].trim() === '' ||
        orderData.customer.city === null ||
        orderData.customer.city.trim() === ''
    ){
        return res.status(400).json({
            message: 'Alguns dados estão faltando: Email, nome, rua, CEP ou cidade.'
        })
    }

    const newOrder = {
        ...orderData,
        id: crypto.randomUUID()
    }
    const orders = await fs.readFile('./data/orders.json', 'utf-8')
    const allOrders = JSON.parse(orders)
    allOrders.push(newOrder)
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders))
    
    res.status(201).json({message: 'Pedido enviado!'})
})

app.use((req, res) => {
    if (req.method === 'OPTIONS'){
        return res.sendStatus(200)
    }

    res.status(404).json({message: 'Não encontrado.'})
})

app.listen(3000, () => {
    console.log(`Servidor rodando no endereço -> http://localhost:3000`)
})

