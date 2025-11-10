'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { mockPhones } from '@/lib/mock-data';

export default function ComparePage() {
  const [selectedPhones, setSelectedPhones] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectPhone = (phoneId: string) => {
    if (selectedPhones.includes(phoneId)) {
      setSelectedPhones(selectedPhones.filter(id => id !== phoneId));
    } else if (selectedPhones.length < 4) {
      setSelectedPhones([...selectedPhones, phoneId]);
    }
  };

  const selectedPhoneData = mockPhones.filter(p => selectedPhones.includes(p.id));
  const availablePhones = mockPhones.filter(p => 
    !selectedPhones.includes(p.id) &&
    (p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
     p.model.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#4169E1] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-2">Compare Phones</h1>
          <p className="text-white/80">Select up to 4 phones to compare side by side</p>
        </div>
      </div>

      <div className="container py-8">
        {selectedPhones.length === 0 ? (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Select Phones to Compare</h2>
            <div className="mb-6">
              <Input
                type="search"
                placeholder="Search phones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availablePhones.slice(0, 8).map(phone => (
                <Card
                  key={phone.id}
                  className="p-4 cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => handleSelectPhone(phone.id)}
                >
                  <div className="aspect-square bg-gray-200 rounded mb-3 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Image</span>
                  </div>
                  <h3 className="font-semibold">{phone.brand}</h3>
                  <p className="text-sm text-gray-500">{phone.model}</p>
                  <p className="text-sm font-medium mt-2">${phone.price}</p>
                </Card>
              ))}
            </div>
          </Card>
        ) : (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                Comparing {selectedPhones.length} Phone{selectedPhones.length !== 1 ? 's' : ''}
              </h2>
              <Button variant="outline" onClick={() => setSelectedPhones([])}>
                Clear All
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#4169E1]">
                    <th className="p-4 text-left text-white font-semibold">Specification</th>
                    {selectedPhoneData.map(phone => (
                      <th key={phone.id} className="p-4 text-center text-white font-semibold min-w-48">
                        <div className="mb-2">{phone.brand}</div>
                        <div className="text-sm font-normal">{phone.model}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">Price</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">${phone.price}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">Display Size</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.displaySize}&quot;</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">Display Type</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.displayType}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">Refresh Rate</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.displayRefreshRate}Hz</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">Chipset</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.chipset}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">RAM</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.ram.join('GB, ')}GB</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">Storage</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.storage.join('GB, ')}GB</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">Main Camera</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.mainCameraMP}MP</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">Front Camera</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.frontCameraMP}MP</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">Battery</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.batteryCapacity}mAh</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">Fast Charging</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.fastCharging}W</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">5G</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.network5G ? 'Yes' : 'No'}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">Weight</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.weight}g</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">IP Rating</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.ipRating}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium bg-gray-50">OS</td>
                    {selectedPhoneData.map(phone => (
                      <td key={phone.id} className="p-4 text-center">{phone.os} {phone.osVersion}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Add More Phones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {availablePhones.slice(0, 4).map(phone => (
                  <Card
                    key={phone.id}
                    className="p-4 cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => handleSelectPhone(phone.id)}
                  >
                    <div className="aspect-square bg-gray-200 rounded mb-3 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Image</span>
                    </div>
                    <h3 className="font-semibold">{phone.brand}</h3>
                    <p className="text-sm text-gray-500">{phone.model}</p>
                    <p className="text-sm font-medium mt-2">${phone.price}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
