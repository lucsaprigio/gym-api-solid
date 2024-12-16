import type { Environment } from 'vitest'

export default <Environment><unknown>{
    name: 'prisma',
    async setup() {
        console.log('Executou o setup')

        return {
            async teardown() {
                console.log('Teardown')
            }
        }
    },
    transformMode: 'ssr' // Adicionando a propriedade transformMode

}