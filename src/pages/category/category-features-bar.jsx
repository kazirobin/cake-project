import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Inside Kathmandu Valley',
    color: 'text-orange-500'
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: '100% fresh baked',
    color: 'text-orange-500'
  },
  {
    icon: Clock,
    title: 'Same Day Delivery',
    description: 'Order before 2 PM',
    color: 'text-orange-500'
  }
];

const FeaturesBar = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {features.map((feature, index) => (
        <Card key={index}>
          <CardContent className="flex items-center p-4">
            <feature.icon className={`w-8 h-8 ${feature.color} mr-3`} />
            <div>
              <h4 className="font-semibold">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturesBar;