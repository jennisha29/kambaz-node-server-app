import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

// export function updateModule(moduleId, moduleUpdates) {
//     const { modules } = Database;
//     const module = modules.find((module) => module._id === moduleId);
//     if (!module) {
//         console.log("Module not found");
//         return null;
//     }
//     Object.assign(module, moduleUpdates);
//     return module;
//   }

  export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);
    // const { modules } = Database;
    // const module = modules.find((module) => module._id === moduleId);
    // Object.assign(module, moduleUpdates);
    // return module;
   }
   
  
   export function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
    // const { modules } = Database;
    // Database.modules = modules.filter((module) => module._id !== moduleId);
   }
   
   

  export function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    return model.create(newModule);
  }
  
export function findModulesForCourse(courseId) {
  return model.find({ course: courseId });
}
 
