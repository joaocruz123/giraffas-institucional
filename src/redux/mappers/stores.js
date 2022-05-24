export const mapFetchStoresByAddressResponse = (response) => {
    console.log()
    return response["Estabelecimentos"].map((item) => {
        const hours = item["HorarioFuncionamentoTexto"].map((item) => {
            return {
                day: item["Dia"],
                today: item["Hoje"],
                hour: item["Hora"],
                schedule: item["Horario"]
            }
        }) || []

        return {
            id: item["Id"],
            address: item["Endereco"],
            distance: item["Distancia"],
            hours: hours,
            name: item["Nome"],
            hasDelivery: item["PossuiDelivery"],
            tags: item["Tags"]
        }
    })
}