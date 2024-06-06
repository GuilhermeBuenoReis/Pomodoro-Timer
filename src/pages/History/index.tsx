import { useContext } from 'react'
import { HistoryContainer, HistoryTable, Status } from './style'
import { CyclesContext } from '../../context/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Histórico</h1>

      <HistoryTable>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycles) => {
              return (
                <tr key={cycles.id}>
                  <td>{cycles.task}</td>
                  <td>{cycles.minutes} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycles.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycles.fineshedDate && (
                      <Status statusColor="green">Concluido</Status>
                    )}
                    {cycles.interrupdedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {!cycles.fineshedDate && !cycles.interrupdedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryTable>
    </HistoryContainer>
  )
}
