const tipOptions = [
    {
        id: 'tip-10',
        value: .10,
        label: '10%'
    },
    {
        id: 'tip-20',
        value: .20,
        label: '20%'
    },
    {
        id: 'tip-50',
        value: .50,
        label: '50%'
    }
]

type TipPercentageFormProps = {
    setTip: React.Dispatch<React.SetStateAction<number>>
    tip: number
}
export default function TipPercentageForm({setTip,tip}: TipPercentageFormProps) {
  return (
    <div>
        <h3 className="font-black text-2xl">Propina:</h3>
        <form>
            {
                tipOptions.map(option => (
                    <div key={option.id} className="flex items-center gap-2 mt-5">
                        <input 
                            type="radio"
                            name="tip" 
                            id={option.id} 
                            value={option.value} 
                            className="cursor-pointer" 
                            onChange={e => setTip(+e.target.value)}
                            checked={option.value === tip}
                            />
                            
                        <label htmlFor={option.id} className="text-lg cursor-pointer">{option.label}</label>
                    </div>
                ))
            }
        </form>
    </div>
  )
}
