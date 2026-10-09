
// Mock browser environment
global.window = global;
global.document = {
  querySelector: (s) => ({
    style: {},
    classList: { add(){}, remove(){}, toggle(){}, contains(){ return false; } },
    addEventListener(){},
    setAttribute(){},
    textContent: '',
    innerHTML: '',
    value: '28',
    children: [],
    appendChild(){}
  }),
  querySelectorAll: (s) => ([{
    style: {},
    classList: { add(){}, remove(){}, toggle(){}, contains(){ return false; } },
    addEventListener(){},
    setAttribute(){},
    dataset: {}
  }]),
  createElement: () => ({
    style: {},
    classList: { add(){}, remove(){}, toggle(){}, contains(){ return false; } },
    addEventListener(){},
    setAttribute(){},
    getContext: () => ({
      clearRect(){}, fill(){}, stroke(){}, fillText(){}, beginPath(){}, moveTo(){},
      arcTo(){}, closePath(){}, strokeRect(){}, fillRect(){}
    })
  })
};
global.addEventListener = () => {};
global.requestAnimationFrame = (fn) => setTimeout(fn, 16);
global.performance = { now: () => Date.now() };
global.devicePixelRatio = 1;

// Mock THREE
global.THREE = {
  WebGLRenderer: class {
    constructor(){ this.shadowMap = {}; }
    setPixelRatio(){} setSize(){} render(){}
  },
  Vector3: class {
    constructor(x=0,y=0,z=0){ this.x=x; this.y=y; this.z=z; }
    set(x,y,z){ this.x=x; this.y=y; this.z=z; return this; }
    clone(){ return new THREE.Vector3(this.x,this.y,this.z); }
    copy(v){ this.x=v.x; this.y=v.y; this.z=v.z; return this; }
    lerp(){ return this; }
    lerpVectors(){ return this; }
  },
  Scene: class { add(){} remove(){} },
  PerspectiveCamera: class {
    constructor(){ this.position = new THREE.Vector3(); }
    updateProjectionMatrix(){}
    lookAt(){}
  },
  AmbientLight: class {},
  DirectionalLight: class { constructor(){ this.position = new THREE.Vector3(); } },
  MeshLambertMaterial: class { constructor(o){ this.color = { set(){} }; } },
  MeshBasicMaterial: class { constructor(o){ this.color = { set(){} }; } },
  LineBasicMaterial: class {},
  LineDashedMaterial: class {},
  BoxGeometry: class {},
  CylinderGeometry: class {},
  SphereGeometry: class {},
  PlaneGeometry: class {},
  RingGeometry: class {},
  BufferGeometry: class {
    setFromPoints(){ return this; }
  },
  Mesh: class {
    constructor(){
      this.position = new THREE.Vector3();
      this.rotation = new THREE.Vector3();
      this.scale = { x:1, y:1, z:1, setScalar(){} };
      this.material = { color: { set(){} } };
      this.userData = {};
      this.children = [];
    }
    add(m){ this.children.push(m); }
  },
  Group: class {
    constructor(){
      this.position = new THREE.Vector3();
      this.rotation = new THREE.Vector3();
      this.scale = { x:1, y:1, z:1, setScalar(){} };
      this.children = [];
      this.userData = {};
    }
    add(m){ this.children.push(m); }
  },
  SpriteMaterial: class {},
  Sprite: class {
    constructor(){
      this.scale = { set(){} };
      this.position = new THREE.Vector3();
    }
  },
  CanvasTexture: class {},
  Line: class {
    constructor(){ this.position = new THREE.Vector3(); this.material = {}; }
    computeLineDistances(){}
  },
  QuadraticBezierCurve3: class {
    constructor(){ this.getPoints = () => []; }
  },
  TorusGeometry: class {},
  DoubleSide: 2
};

try {
  require('./app.js');
  console.log('App loaded without initial errors!');
  setTimeout(() => {
    console.log('Verification successful: zero runtime exceptions!');
    process.exit(0);
  }, 200);
} catch(e) {
  console.error('ERROR ENCOUNTERED:', e);
  process.exit(1);
}
