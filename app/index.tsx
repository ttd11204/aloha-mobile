import { getPackageApi } from '@/components/api/packageApi';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import './global.css';
import { useGetPackageDataQuery } from '@/features/home/api/packageApi';

type Package = {
  id: string;
  name: string;
};
export default function Index() {
  const { data: packages} = useGetPackageDataQuery();
  // const [packages, setPackages] = useState<Package[]>([]);

  // useEffect(() => {
  //   const fetchPackages = async () => {
  //     try {
  //       const data = await getPackageApi();
  //       setPackages(data);
  //       console.log('Fetched packages:', data);
  //     } catch (error) {
  //       console.error('Error fetching packages:', error);
  //     }
  //   };

  //   fetchPackages();
  // }, []);
  
  return (
    <View className='flex-1 items-center justify-center'>
      {packages &&
        packages.map((pk) => (
          <Text key={pk.id} className='text-5xl text-accent '>
            {pk.name}
          </Text>
        ))}
    </View>
  );
}
