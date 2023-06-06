export function isKeyOperator(operator: string): boolean {
    return operator === ';' || operator === '&' || operator === '?';
}