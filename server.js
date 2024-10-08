const express = require('express')
const app = express()

app.use(express.static('public'))

// Iniciar o servidor
const PORT = 3000
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`)
})