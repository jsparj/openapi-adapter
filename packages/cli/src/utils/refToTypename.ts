import { nameToTypename } from "./nameToTypename"


export function refToTypename(ref: string ): string {
  let parts = ref.split("/")
  let name = parts[parts.length-1]
  return nameToTypename(name)
}