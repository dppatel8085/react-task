// import { useState } from 'react'
// import './App.css'
// import { FiChevronDown, FiChevronRight, FiEdit2, FiFile, FiFolder, FiPlus, FiTrash2, FiType } from 'react-icons/fi';

// const inititialFileSystem={
//   type:'folder',
//   name:'root',
//   children:[
//     {
//       type:'folder',
//       name:'Documents',
//       children:[
//         {type:'file',name:'resume.txt',content:'this is a sample resume content'},
//         {type:'file',name:'notes.txt',conent:'simple notes for project'}
//       ]
//     },
//      {
//       type:'folder',
//       name:'Pictures',
//       children:[
//         {type:'file',name:'photo.jpg',content:'this is a sample photo description'},
//       ]
//     },
//     {type:'file' ,name:'readme.md',content:'Welcome to the file explorer app'}
//   ]
// };

// const findItem=(fs,path)=>{
//   if(path.length==0) return fs;
//   let current =fs;
//   for(let p of path){
//     current=current.children.find((child)=>child.name===p);
//     if(!current) return null
//   }
//   return current
// }

// const updateItem=(fs,path,updater)=>{
//   if(path.length==0 ) return updater(fs);
//   const newFs={...fs};
//   let current=newFs;
//   for(let i=0 ;i<path?.length;i++){
//     const childIndex=current.children.findIndex((child)=>child.name==path[i]);
//     current.children=[...current.children]
//     current=current.children[childIndex]={...current.childIndex[childIndex]}
//   }
//   const last=path[path.length-1]
//     const childIndex=current.children.findIndex((child)=>child.name==last);
//     if(childIndex!==-1){
//       current.children[childIndex]=updater(current.children[childIndex]);
//     }else{
//       current.children.push(updater({}))
//     }
//     return newFs
// }

// const deleteItem=(fs,path)=>{
//   if(path.length==0 ) return fs;
//    const newFs={...fs};
//   let current=newFs;
//     for(let i=0 ;i<path?.length;i++){
//     const childIndex=current.children.findIndex((child)=>child.name==path[i]);
//     current.children=[...current.children]
//     current=current.children[childIndex]={...current.childIndex[childIndex]}
//   }
//   current.children=current.children.filter((child)=>child.name!=path[path.length-1]);
//   return newFs;

// }

// function App() {
//   const [fileSystem,setFileSystem]=useState(inititialFileSystem);
//   const [currentPath,setcurrentPath]=useState([]);
//   const [expandedFolders,setExpandedFolders]=useState(new Set(['root']));
//   const [selectedItem,setSeletedItem]=useState(null);
//   const [operation,setOperation]=useState(null);
//   const [newName,setNewName]=useState('');
//   const [error,setError]=useState('');
//   const [fileContent,setFileContent]=useState('')

//   const currentFolder=findItem(fileSystem,currentPath);
//   const toggleExpand=(path)=>{
//     const key=path.join('/');
//     setExpandedFolders((prev)=>{
//       const newSet=new set(prev)
//       if(newSet.has(key)){
//         newSet.delete(key)
//       }else{
//         newSet.add(key)
//       }
//       return newSet;
//     })
//   }


// const navigateTo=(path)=>{
//   setcurrentPath(path)
//   setSeletedItem(null)
//   setOperation(null)
//   setFileContent('')
//   setError('')
// }

// const startCreate=(type)=>{
//   setOperation('create');
//   setNewName(type=='folder' ? 'New Folder' :'New File.txt');
//   setSeletedItem({type})
//   setError('')
// }


// const startRename=(item)=>{
//    setOperation('rename');
//   setNewName(item?.name);
//   setSeletedItem(item)
//   setError('') 
// }


// const startDelete=(item)=>{
//   if(window.confirm(`Are you sure want to delete ${item.name}`)){
//     const itemPath=[...currentPath,item.name]
//     setFileSystem(deleteItem(fileSystem,itemPath))
//     setSeletedItem(null)
//     setOperation(null)
//     setError('')
//   }
// }
  

// const startView=(item)=>{
//   if(item.type=='file'){
//        setOperation('view');
//        setFileContent(item.conent || 'No content')
//   setSeletedItem(item)
//   setError('') 
//   }
// }


// const handleSubmit=()=>{
//   if(!newName.trim()){
//     setError('Name can not empty')
//     return
//   }
//   if(currentFolder.children.some((child)=>child.name==newName && child !=selectedItem)){
//     setError('Name already in directory')
//     return;
//   }
//   if(!/^[a-zA-Z0-9._-]+$/.test(newName)){
//     setError('Name can contain letter,numbers,underscore')
//     return
//   }
//   setError('')

// if(operation=='create'){
//   const newItem={
//     type:selectedItem.type,
//     name:newName,
//     ...(selectedItem.type=='folder' ? {children:[]} : {content:''}),
//   }
// const newFs=updateItem(fileSystem,currentPath,(folder)=>({
//   ...folder,
//   children:[...folder.children,newItem]
// }))
// setFileSystem(newFs)


// }else if(operation=='rename'){
//   const itemPath=[...currentPath,selectedItem.name];
//   const newFs=updateItem(fileSystem,itemPath,(item)=>({
//     ...item,
//     name:newName,
//   }))
//   setFileSystem(newFs)
// }
// setOperation(null)

// setNewName('')
// setSeletedItem(null)
// }


// const renderTree=(folder,path=[])=>{
//   const key=path.join('/')
//   const isExpanded=expandedFolders.has(key)
//   return (
//     <div key={key} className='text-sm'>
//       <div className='flex items-center cursor-pointer rounded p-1' onClick={()=>{
//         toggleExpand(path);
//         if(folder.type =='folder'){
//           navigateTo(path)
//         }else{
//           startView(folder)
//         }
//       }}>
//         {folder.type=='folder' && (
//           <> 
//           {isExpanded ?  < FiChevronDown className='mr-1' /> : <FiChevronRight className='mr-1' />}
//           <FiFolder className='mr-2 text-yellow-500' />
//           </>
//         )}
//         {folder.type=='file' && <FiFile className='mr-2 text-gray-500' />}
//         <span className='truncate'>{folder.name}</span>
//       </div>
//       {isExpanded && folder.children && (
//         <div className='ml-4'>{
//           folder.children?.map((child)=>
//             renderTree(child,[...path,child.name])
//           )
//         }</div>
//       )}
//     </div>
//   )
// }


//   return (
//   <div className='flex flex-col md:flex-row h-screen bg-gray-100'>
//     <div className='w-full md:w-1/4 bg-white border-r overflow-y-auto p-4'>
//     <h2 className='text-lg font-bold mb-4'>File Explorer</h2>
//     {renderTree(fileSystem,['root'])}
//     </div>

//     <div className='w-full md:w-3/4 p-4 overflow-y-auto'>
//     <h2 className='text-lg font-bold mb-4'>Current Directory : / {currentPath.join('/')}</h2>
//     <div className='flex mb-4 space-x-2'>
//       <button onClick={()=>startCreate('folder')} className='bg-blue-500 text-white px-3 py-1 rounded flex items-center '><FiPlus className='mr-1' />New folder </button>
//       <button onClick={()=>startCreate('file')} className='bg-blue-500 text-white px-3 py-1 rounded flex items-center ' ><FiPlus className='mr-1' />New file
//       </button>

//     </div>
//     {
//       error && (
//         <p className='text-red-500 mb-4 bg-red-100 p-2 rounded '>{error}</p>
//       )
//     }
//     {(operation=='create' || operation=='rename') && (
//       <div className='mb-4 flex items-center space-x-2'>
//         <input type='text'
//         value={newName}
//         onChange={(e)=>setNewName(e.target.value)}
//         className='border p-2 rounded flex-grow'
//         placeholder={operation=='create' ? 'Enter name' :'Enter new name'}
//          />
//          <button onClick={handleSubmit} className='bg-grren-500 text-white px-3 py-2 rounded '>Submit</button>
//          <button onClick={()=>{
//           setOperation(null)
//           setNewName('')
//           setSeletedItem(null)
//           setError('')
//          }}  className='bg-gray-500 text-white  px-3 py-2 rounded '>Cancel</button>
//       </div>
//     )}
//     {operation =='view' ? (
//       <div className='bg-white p-4 rounded border'>
//         <h3 className='text-md font-bold mb-2 '>View : {selectedItem.name}</h3>
//         <pre className='bg-gray-50 p-4 rounded border text-sm '>{fileContent}</pre>
//         <button onClick={()=>{
//             setOperation(null)
//           setFileContent('')
//           setSeletedItem(null)
//         }} className='mt-2 bg-gray-500 text-white px-3 py-2 rounded '> close</button>
//       </div>
//     ):(
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:frid-cols-4 gap-4'>{
//         currentFolder.children.map((item)=>(
//           <div key={item.name} 
//           className='bg-white p-3 border '
//           onDoubleClick={()=>{
//             if(item.type=='folder'){
//               navigateTo([...currentPath,item.name])
//             }else{
//               startView(item)
//             }
//           }}
//           >
//             <div className='flex justify-center '>
//               {
//                 item.type=='folder' ? (
//                   <FiFolder  size={40} className='text-yellow-500' />
//                 ) : 
//                 <FiFile   size={40} className='text-gray-500' />
//               }
//               </div>
//               <p className='text-center text-sm'>{item.name}</p>
//               <div className='flex justify-center'>
//                 <FiEdit2  onClick={()=>startRename(item)} className='text-blue-500'/>
//                   <FiTrash2  onClick={()=>startDelete(item) } className='text-red-500'/>
//                     {item.type=='file' && (
//                       <FiType onClick={()=>startView(item)}  className='text-green-500'/>
//                     )}
//               </div>
//           </div>
//         ))
//       }</div>
//     )}
//     </div>
//   </div>
//   )
// }

// export default App



import { useState } from 'react';
import './App.css';
import { FiChevronDown, FiChevronRight, FiEdit2, FiFile, FiFolder, FiPlus, FiTrash2, FiType } from 'react-icons/fi';

const initialFileSystem = {
  type: 'folder',
  name: 'root',
  children: [
    {
      type: 'folder',
      name: 'Documents',
      children: [
        { type: 'file', name: 'resume.txt', content: 'This is a sample resume content' },
        { type: 'file', name: 'notes.txt', content: 'Simple notes for project' },
      ],
    },
    {
      type: 'folder',
      name: 'Pictures',
      children: [{ type: 'file', name: 'photo.jpg', content: 'This is a sample photo description' }],
    },
    { type: 'file', name: 'readme.md', content: 'Welcome to the file explorer app' },
  ],
};

const findItem = (fs, path) => {
  if (path.length === 0) return fs;
  let current = fs;
  for (let p of path) {
    current = current.children?.find((child) => child.name === p);
    if (!current) return null;
  }
  return current;
};

const updateItem = (fs, path, updater) => {
  if (path.length === 0) return updater(fs);
  const newFs = { ...fs, children: [...fs.children] };
  let current = newFs;
  for (let i = 0; i < path.length - 1; i++) {
    const childIndex = current.children.findIndex((child) => child.name === path[i]);
    if (childIndex === -1) return fs;
    current.children[childIndex] = { ...current.children[childIndex], children: [...current.children[childIndex].children] };
    current = current.children[childIndex];
  }
  const last = path[path.length - 1];
  const childIndex = current.children.findIndex((child) => child.name === last);
  if (childIndex !== -1) {
    current.children[childIndex] = updater(current.children[childIndex]);
  } else {
    current.children.push(updater({}));
  }
  return newFs;
};

const deleteItem = (fs, path) => {
  if (path.length === 0) return fs;
  const newFs = { ...fs, children: [...fs.children] };
  let current = newFs;
  for (let i = 0; i < path.length - 1; i++) {
    const childIndex = current.children.findIndex((child) => child.name === path[i]);
    if (childIndex === -1) return fs;
    current.children[childIndex] = { ...current.children[childIndex], children: [...current.children[childIndex].children] };
    current = current.children[childIndex];
  }
  current.children = current.children.filter((child) => child.name !== path[path.length - 1]);
  return newFs;
};

function App() {
  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [currentPath, setCurrentPath] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState(new Set(['root']));
  const [selectedItem, setSelectedItem] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [fileContent, setFileContent] = useState('');

  const currentFolder = findItem(fileSystem, currentPath);

  const toggleExpand = (path) => {
    const key = path.join('/');
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const navigateTo = (path) => {
    setCurrentPath(path);
    setSelectedItem(null);
    setOperation(null);
    setFileContent('');
    setError('');
  };

  const startCreate = (type) => {
    setOperation('create');
    setNewName(type === 'folder' ? 'New Folder' : 'New File.txt');
    setSelectedItem({ type });
    setError('');
  };

  const startRename = (item) => {
    setOperation('rename');
    setNewName(item.name);
    setSelectedItem(item);
    setError('');
  };

  const startDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      const itemPath = [...currentPath, item.name];
      setFileSystem(deleteItem(fileSystem, itemPath));
      setSelectedItem(null);
      setOperation(null);
      setError('');
    }
  };

  const startView = (item) => {
    if (item.type === 'file') {
      setOperation('view');
      setFileContent(item.content || 'No content');
      setSelectedItem(item);
      setError('');
    }
  };

  const handleSubmit = () => {
    if (!newName.trim()) {
      setError('Name cannot be empty');
      return;
    }
    if (currentFolder.children.some((child) => child.name === newName && child !== selectedItem)) {
      setError('Name already exists in directory');
      return;
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(newName)) {
      setError('Name can only contain letters, numbers, underscores, or hyphens');
      return;
    }
    setError('');

    if (operation === 'create') {
      const newItem = {
        type: selectedItem.type,
        name: newName,
        ...(selectedItem.type === 'folder' ? { children: [] } : { content: '' }),
      };
      const newFs = updateItem(fileSystem, currentPath, (folder) => ({
        ...folder,
        children: [...folder.children, newItem],
      }));
      setFileSystem(newFs);
    } else if (operation === 'rename') {
      const itemPath = [...currentPath, selectedItem.name];
      const newFs = updateItem(fileSystem, itemPath, (item) => ({
        ...item,
        name: newName,
      }));
      setFileSystem(newFs);
    }
    setOperation(null);
    setNewName('');
    setSelectedItem(null);
  };

  const renderTree = (folder, path = []) => {
    const key = path.join('/');
    const isExpanded = expandedFolders.has(key);
    return (
      <div key={key} className="text-sm">
        <div
          className="flex items-center cursor-pointer rounded p-1 hover:bg-gray-100"
          onClick={() => {
            toggleExpand(path);
            if (folder.type === 'folder') {
              navigateTo(path);
            } else {
              startView(folder);
            }
          }}
        >
          {folder.type === 'folder' && (
            <>
              {isExpanded ? <FiChevronDown className="mr-1" /> : <FiChevronRight className="mr-1" />}
              <FiFolder className="mr-2 text-yellow-500" />
            </>
          )}
          {folder.type === 'file' && <FiFile className="mr-2 text-gray-500" />}
          <span className="truncate">{folder.name}</span>
        </div>
        {isExpanded && folder.children && (
          <div className="ml-4">
            {folder.children.map((child) => renderTree(child, [...path, child.name]))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="w-full md:w-1/4 bg-white border-r overflow-y-auto p-4">
        <h2 className="text-lg font-bold mb-4">File Explorer</h2>
        {renderTree(fileSystem, ['root'])}
      </div>

      <div className="w-full md:w-3/4 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Current Directory: /{currentPath.join('/')}</h2>
        <div className="flex mb-4 space-x-2">
          <button
            onClick={() => startCreate('folder')}
            className="bg-blue-500 text-black-500 px-3 py-1 rounded flex items-center"
          >
            <FiPlus className="mr-1" /> New Folder
          </button>
          <button
            onClick={() => startCreate('file')}
            className="bg-blue-500 text-black-500 px-3 py-1 rounded flex items-center"
          >
            <FiPlus className="mr-1" /> New File
          </button>
        </div>
        {error && <p className="text-red-500 mb-4 bg-red-100 p-2 rounded">{error}</p>}
        {(operation === 'create' || operation === 'rename') && (
          <div className="mb-4 flex items-center space-x-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border p-2 rounded flex-grow"
              placeholder={operation === 'create' ? 'Enter name' : 'Enter new name'}
            />
            <button onClick={handleSubmit} className="bg-green-500 text-black px-3 py-2 rounded">
              Submit
            </button>
            <button
              onClick={() => {
                setOperation(null);
                setNewName('');
                setSelectedItem(null);
                setError('');
              }}
              className="bg-gray-500 text-black-500 px-3 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        )}
        {operation === 'view' ? (
          <div className="bg-white p-4 rounded border">
            <h3 className="text-md font-bold mb-2">View: {selectedItem.name}</h3>
            <pre className="bg-gray-50 p-4 rounded border text-sm">{fileContent}</pre>
            <button
              onClick={() => {
                setOperation(null);
                setFileContent('');
                setSelectedItem(null);
              }}
              className="mt-2 bg-gray-500 text-black px-3 py-2 rounded"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {currentFolder.children.map((item) => (
              <div
                key={item.name}
                className="bg-white p-3 border rounded hover:bg-gray-50"
                onDoubleClick={() => {
                  if (item.type === 'folder') {
                    navigateTo([...currentPath, item.name]);
                  } else {
                    startView(item);
                  }
                }}
              >
                <div className="flex justify-center">
                  {item.type === 'folder' ? (
                    <FiFolder size={40} className="text-yellow-500" />
                  ) : (
                    <FiFile size={40} className="text-gray-500" />
                  )}
                </div>
                <p className="text-center text-sm truncate">{item.name}</p>
                <div className="flex justify-center space-x-2 mt-2">
                  <FiEdit2 onClick={() => startRename(item)} className="text-blue-500 cursor-pointer" />
                  <FiTrash2 onClick={() => startDelete(item)} className="text-red-500 cursor-pointer" />
                  {item.type === 'file' && (
                    <FiType onClick={() => startView(item)} className="text-green-500 cursor-pointer" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;