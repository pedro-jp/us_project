export default function formatDuration(minutes: number) {
  if (minutes < 60) {
    return `${minutes}m`; // Exibe apenas minutos se for menor que 1 hora
  }
  const hours = Math.floor(minutes / 60); // Divide os minutos por 60 para calcular as horas
  const remainingMinutes = minutes % 60; // Calcula os minutos restantes
  return remainingMinutes > 0
    ? `${hours}h ${remainingMinutes}m` // Exibe horas e minutos
    : `${hours}h`; // Exibe apenas horas se não houver minutos restantes
}
