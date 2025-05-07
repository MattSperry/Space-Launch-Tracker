export type Launch = {
  id: string
  name: string
  net: string
  image: string | null
  pad: {
    name: string
    location: { name: string }
  }
  mission: {
    type: string
    description: string
  }
  launch_service_provider: {
    id: number
    url: string
    name: string
    type: string
  }
}
