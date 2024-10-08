document.getElementById('userForm').addEventListener('submit', function(e){
    e.preventDefault()

    // Captura os dados do formulário
    let array = []
    
    let inputs = document.querySelectorAll('#userForm input[name="name"]')
    let input = Array.from(inputs).map(input => input.value)
    
    input.forEach((element, index) => {
      let inputOut = element
      array.push(inputOut)
      // console.log(`${index} : ${inputOut}`)
    })

    let saida = array.join('-')

    console.log(saida)
})