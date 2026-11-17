export function reduzirImagem(arquivo, tamanhoMaximo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader()

    leitor.onload = () => {
      const imagem = new Image()

      imagem.onload = () => {
        const escala = Math.min(1, tamanhoMaximo / Math.max(imagem.width, imagem.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(imagem.width * escala)
        canvas.height = Math.round(imagem.height * escala)

        const contexto = canvas.getContext('2d')
        contexto.drawImage(imagem, 0, 0, canvas.width, canvas.height)

        let qualidade = 0.8
        let resultado = canvas.toDataURL('image/webp', qualidade)

        while (resultado.length > 60000 && qualidade > 0.3) {
          qualidade = qualidade - 0.1
          resultado = canvas.toDataURL('image/webp', qualidade)
        }

        resolve(resultado)
      }

      imagem.onerror = () => reject(new Error('Não foi possível ler a imagem.'))
      imagem.src = leitor.result
    }

    leitor.onerror = () => reject(new Error('Não foi possível ler a imagem.'))
    leitor.readAsDataURL(arquivo)
  })
}
