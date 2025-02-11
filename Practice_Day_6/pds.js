// propertyDescriptor
// function intro() {
//     const o1 = {
//         fName: 'vishal',
//         lName: 'prajapati',
//         age: 22,
//         get getAge() {
//             return this.age
//         },
//         set getAge(age) {
//             this.age = 22
//         }
//     }
//     o1.dept = 'web'
// const desc_for_one_field = Object.getOwnPropertyDescriptor(o1, 'fName')
// console.log('desc for one field', desc_for_one_field);
// const desc_for_all_fields = Object.getOwnPropertyDescriptors(o1)
// console.log('desc for all fields', desc_for_all_fields);
/*
    ####################### property descriptors ######################
    definition:object associated with each property of the object that contains
     information about their properties.
    property descriptor object keys(6):[configurable,writable,enumerable,value,get,set]

    types of property descriptor:
    1. Data descriptor :[configurable,writable,value,enumerable]
    2. Accessor descriptor:[configurable,enumerable,set,get]


    configurable: changing the property is allowed or property can be deleted (true/false)
    enumerable: can be see during the enumeration example for ...... in loop (true/false)
    writable: changing value allowed or not (true/fa)
    */
// }
// intro()

function waysToDefinePropertiesInObject() {
  const linux = {
    distro: {
      arch: {},
      debian: {}
    }
  }
  linux['kernel'] = [1, 2, 3, 4, 5, 6, 4.5]
  linux.inventedBy = 'Linus Torvalds'
  Object.defineProperty(linux, 'fs', { value: ['ext4', 'brfts'] })
  Object.defineProperties(linux, {
    x: { value: 10 },
    y: { value: 100, enumerable: true, configurable: true }
  })
  // console.log('object', Object.getOwnPropertyDescriptors(linux));
  // console.log('property descriptors', Object.getOwnPropertyDescriptors(linux));
  // accessing key/values of object
  // console.log('properties names', Object.getOwnPropertyNames(linux));
  // console.log('object keys', Object.keys(linux));
  // console.log('Object values', Object.values(linux));
  // console.log('object entries', Object.entries(linux));
}
waysToDefinePropertiesInObject()

// function objectCanBe() {
/*
    1. extensible  - new properties can be added []
    2. sealed - properties can't be added, deleted or configured but are still writable
    3. frozen - properties can't be changed in any way 

    To check : 
                Object.isExtensible(<obj>)
                Object.isSealed(<obj>)
                Object.isFrozen(<obj>)
    */
// const o0 = { a: 1, b: 2 }
// const o1 = { a: 1, b: 2 }
// const o2 = { a: 1, b: 2 }
const o3 = { a: 1, b: 2 }
// Object.preventExtensions(o1)
// Object.seal(o2)
Object.freeze(o3)

// - try to extend
// o0.c = 3
// o1.c = 3
// o2.c = 3
// o3.c = 3
// console.log('try to extend', o0, o1, o2, o3);

// - try to write
// o0.a = 10
// o1.a = 10
// o2.a = 10
// o3.a = 10
// console.log('try to write', o0, o1, o2, o3);

// - try to delete
// delete o0.a
// delete o1.a
// delete o2.a
delete o3.a
console.log('try to delete', o3)

// - checking property descriptor
// console.log({
//     normal: Object.getOwnPropertyDescriptors(o0),
//     nonExtensible: Object.getOwnPropertyDescriptors(o1),
//     sealed: Object.getOwnPropertyDescriptors(o2),
//     frozen: Object.getOwnPropertyDescriptors(o3)
// });
// }

// objectCanBe()
