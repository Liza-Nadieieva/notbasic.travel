
export default function MentorCard ({ name, work, description, list, feature, photo }){
  return (
    <div>
      <h3 className="text-2xl font-intel mb-1 flex items-center gap-3">
      <img
          src={photo}
          alt={`${name} Badge`}
          className="w-20 h-20 rounded-full object-cover border-2 border-[#FFB88C] transition duration-200 hover:scale-105 hover:shadow-md"
      />
        {name}
      </h3>
      <p className="font-semibold">{work}</p>
      {description && <p className="mt-1">{description}</p>}
      <ul className="text-sm mt-2 list-disc list-inside space-y-1">
      {list.map((item, idx) => (
          <li key={idx}>{item}</li>
      ))}
      </ul>
      <p className="text-sm text-[#846d53] mt-1">{feature}</p>
    </div>
  )
};
