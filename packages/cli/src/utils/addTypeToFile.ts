import { File, Namespace, TypeVariable } from '../codegen'
import { nameToTypename } from './nameToTypename'

export function addTypeToFile(parentNamespace: string[], typeVariable: TypeVariable, file: File ) {
  if (parentNamespace.length == 0) {
    file.tryAddObjects(typeVariable)
  } else {
    let targetNS: Namespace
    let _baseNS = new Namespace(nameToTypename(parentNamespace[0]),true)
    let baseNS = file.tryGetNamespace(_baseNS.id)
    if(!!baseNS) {
      targetNS = baseNS
    } else {
      targetNS = _baseNS
      file.tryAddObjects(_baseNS)
    }

    for(let i = 1;i<parentNamespace.length;i++) {
      let _ns = new Namespace(nameToTypename(parentNamespace[i]),true)
      let ns = targetNS.tryGetNamespace(_ns.id)
      if(!!ns) {
        targetNS.tryAddObjects(ns)
        targetNS = ns
      } else {
        targetNS = _ns
        file.tryAddObjects(_ns)
      }
    }
    targetNS.tryAddObjects(typeVariable)
  }
}