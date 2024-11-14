import React from 'react'

function AcreSalComponent() {
  return (
    <div className='min-h-screen'>
     

      <section className="container mx-auto p-4 space-y-4">
 <div className="text-center">
    <h1 className="text-5xl font-bold text-blue-700">Project Components</h1>
 </div>

 <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8 ">
    <div className="p-4 border-2 border-blue-700 hover:shadow-lg w-full  ">
      <div className="h-64">
        <img height={500} width={500} className="rounded-md object-cover w-full h-full" src="https://img.freepik.com/premium-photo/ground-drought-fields-ground-drought-sunrise-background_416458-247.jpg?w=740" alt="dry Land" />
      </div>
      <div className="mt-4">
        <h1 className="text-blue-700 font-bold text-xl">COMPONENT A - Dryland Management​</h1>
        <p className="text-sm text-gray-500 mt-2 font-medium">This component will implement integrated watershed management planning and addresses challenges of large-scale watershed degradation in northern Nigeria</p>
      </div>
    </div>

    <div className="p-4 border-2 border-blue-700 hover:shadow-lg w-full  ">
      <div className="h-64">
        <img height={500} width={500} className="rounded-md object-cover w-full h-full" src="https://img.freepik.com/premium-photo/comparing-green-earth-effect-air-pollution-from-human-action-glbal-warming-concept-green-tree-green-earth-with-light-arid-land-with-air-pollusion-background_521740-329.jpg?w=740" alt="Beyond Food" />
      </div>
      <div className="mt-4">
        <h1 className="text-blue-700 font-bold text-xl">COMPONENT B - Community Climate Resilience</h1>
        <p className="text-sm text-gray-500 mt-2 font-medium">Most of the challenges of dryland management are to be found at the local level, where they constitute the day-today reality of communities and farmers. Communities need support to be more resilient and communites and households need targeted investments to put new approaches into effect in targeted microwatersheds</p>
      </div>
    </div>

    <div className="p-4 border-2 border-blue-700 hover:shadow-lg w-full  ">
      <div className="h-64">
        <img height={500} width={500} className="rounded-md object-cover w-full h-full" src="https://img.freepik.com/free-photo/side-view-women-shaking-hands_23-2149894715.jpg?t=st=1731597744~exp=1731601344~hmac=521e23071a2e83d5d5eb5570f46c1566ba142b25fb1788a89d2a4b3359f59698&w=740" alt="Beyond Food" />
      </div>
      <div className="mt-4">
        <h1 className="text-blue-700 font-bold text-xl">COMPONENT C - Institutional and Policy Strengthening Project Management</h1>
        <p className="text-sm text-gray-500 mt-2 font-medium">This component includes investments to improve the enabling institutional and policy foundation for multisectoral integrated landscape management and climate resilence, as well as support to project management</p>
      </div>
    </div>


    <div className="p-4 border-2 border-blue-700 hover:shadow-lg w-full  ">
      <div className="h-64">
        <img height={500} width={500} className="rounded-md object-cover w-full h-full" src="https://img.freepik.com/free-photo/reforestation-done-by-voluntary-group_23-2149500874.jpg?t=st=1731597955~exp=1731601555~hmac=e5211ade84de730b5c2c4c1b192147e2398eed3b255e490030ae10ef9900a938&w=740" alt="Acresal" />
      </div>
      <div className="mt-4">
        <h1 className="text-blue-700 font-bold text-xl">COMPONENT D - Contingent Emergency Response</h1>
        <p className="text-sm text-gray-500 mt-2 font-medium"> Implement programs to support educational success, such as providing tutoring services, study materials, or scholarships for exceptional students.</p>
      </div>
    </div>


 
  

 </div>
</section>
    </div>
  )
}

export default AcreSalComponent
