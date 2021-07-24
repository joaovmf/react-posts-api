import './styles.css'

export const TextInput = ({ searchValue, handleChange}) => {
    return (
        <input 
        placeholder="Escreva sua busca"
        className="text-input"
        value={searchValue} 
        onChange={handleChange} 
        type="search" />
    )
}