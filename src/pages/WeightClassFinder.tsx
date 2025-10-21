import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type Gender = 'male' | 'female'
type Units = 'lbs' | 'kg'

interface WeightClass {
  name: string
  limit: number
}

const maleWeightClasses: WeightClass[] = [
  { name: 'Flyweight', limit: 125 },
  { name: 'Bantamweight', limit: 135 },
  { name: 'Featherweight', limit: 145 },
  { name: 'Lightweight', limit: 155 },
  { name: 'Welterweight', limit: 170 },
  { name: 'Middleweight', limit: 185 },
  { name: 'Light Heavyweight', limit: 205 },
  { name: 'Heavyweight', limit: 265 },
]

const femaleWeightClasses: WeightClass[] = [
  { name: 'Strawweight', limit: 115 },
  { name: 'Flyweight', limit: 125 },
  { name: 'Bantamweight', limit: 135 },
  { name: 'Featherweight', limit: 145 },
]

export default function WeightClassFinder() {
  const [gender, setGender] = useState<Gender>('male')
  const [units, setUnits] = useState<Units>('lbs')
  const [weight, setWeight] = useState<string>('')
  const [result, setResult] = useState<string>('')

  const convertToLbs = (weightValue: number, unit: Units): number => {
    if (unit === 'kg') return weightValue * 2.20462
    return weightValue
  }

  const findWeightClass = (weightInLbs: number, genderType: Gender): string => {
    const classes = genderType === 'male' ? maleWeightClasses : femaleWeightClasses

    for (const weightClass of classes) if (weightInLbs <= weightClass.limit) return weightClass.name

    if (genderType === 'male') return 'Super Heavyweight'

    return 'Above UFC Divisions'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const weightValue = parseFloat(weight)

    if (isNaN(weightValue) || weightValue <= 0) {
      setResult('Please enter a valid weight')
      return
    }

    const weightInLbs = convertToLbs(weightValue, units)
    const weightClass = findWeightClass(weightInLbs, gender)

    setResult(weightClass)
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wider font-bebas text-red-500">
          FIND YOUR WEIGHT CLASS
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Enter your details to discover your MMA division
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <Label
            htmlFor="weight"
            className="text-white font-semibold text-base uppercase tracking-wide"
          >
            Weight
          </Label>
          <Input
            id="weight"
            type="tel"
            step="0.1"
            placeholder={`Enter your weight in ${units}`}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="bg-black border-2 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 h-12 text-base transition-all"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label className="text-white font-semibold text-base uppercase tracking-wide">
              Units
            </Label>
            <RadioGroup
              value={units}
              onValueChange={(value) => setUnits(value as Units)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="lbs"
                  id="lbs"
                  className="border-2 border-gray-600 text-red-500"
                />
                <Label htmlFor="lbs" className="text-white font-medium cursor-pointer">
                  lbs
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="kg"
                  id="kg"
                  className="border-2 border-gray-600 text-red-500"
                />
                <Label htmlFor="kg" className="text-white font-medium cursor-pointer">
                  kg
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-3">
            <Label className="text-white font-semibold text-base uppercase tracking-wide">
              Gender
            </Label>
            <RadioGroup
              value={gender}
              onValueChange={(value) => setGender(value as Gender)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="male"
                  id="male"
                  className="border-2 border-gray-600 text-red-500"
                />
                <Label htmlFor="male" className="text-white font-medium cursor-pointer">
                  Male
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="female"
                  id="female"
                  className="border-2 border-gray-600 text-red-500"
                />
                <Label htmlFor="female" className="text-white font-medium cursor-pointer">
                  Female
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full h-14 text-lg font-bold uppercase tracking-wider transition-all bg-red-600 hover:bg-red-500 font-bebas cursor-pointer"
        >
          Check Weight Class
        </Button>
      </form>

      {result && (
        <div className="mt-10 text-center p-8 border-2 border-red-500 bg-black transition-all animate-in fade-in duration-300">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Your Division</p>
          <p className="text-4xl md:text-5xl font-bold text- text-red-500 font-bebas">{result}</p>
        </div>
      )}
    </div>
  )
}
