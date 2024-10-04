import { Scene,Engine, FreeCamera, Vector3, Light, HemisphericLight, MeshBuilder, StandardMaterial, Texture } from "@babylonjs/core";

export class StandardMaterials
{
    scene: Scene;
    engine: Engine;

    constructor(private canvas:HTMLCanvasElement)
    {
        this.engine = new Engine(this.canvas,true);
        this.scene = this.CreateScene();

        this.engine.runRenderLoop(() => 
        {
            this.scene.render();
        })
    }

    CreateScene():Scene
    {
        const scene = new Scene(this.engine);

        const camera = new FreeCamera("camera", new Vector3(0,1,-5), this.scene);
        camera.attachControl();
        camera.speed = 0.25;


        const hemiLight = new HemisphericLight("hemiLight", new Vector3(0,1,0),this.scene);
        hemiLight.intensity = 1;

        const ground = MeshBuilder.CreateGround("ground",{width:10,height:10},this.scene);

        const sphere = MeshBuilder.CreateSphere("sphere",{diameter:1},this.scene);

        sphere.position = new Vector3(0,1,0);

        ground.material = this.CreateGroundMaterial();

        sphere.material = this.CreateSphereMaterial();

        return scene;
    }

CreateGroundMaterial():StandardMaterial
{
    const groundMat = new StandardMaterial("groundMat",this.scene);

    const uvScale = 4;
    const texArray: Texture[] = [];

    const diffuseTex = new Texture("./textures/MacroFlour/macroFlourDiffuse.jpg",this.scene);

    groundMat.diffuseTexture = diffuseTex;
    texArray.push(diffuseTex);

    const NormalTex = new Texture("./textures/MacroFlour/macroFlourNormal.jpg",this.scene);

    groundMat.bumpTexture = NormalTex;
    texArray.push(NormalTex);

    const aoTex = new Texture("./textures/MacroFlour/macroFlourAO.jpg",this.scene);

    groundMat.ambientTexture = aoTex;
    texArray.push(aoTex);

    texArray.forEach((tex) => {
        tex.uScale = uvScale;
        tex.vScale = uvScale;
    })

    return groundMat;
}

CreateSphereMaterial():StandardMaterial
{
    const sphereMat = new StandardMaterial("sphereMat",this.scene);

    const uvScale = 3;
    const texArray: Texture[] = [];

    const diffuseTex = new Texture("./textures/RockWall/rockWallDiffuse.jpg",this.scene);

    sphereMat.diffuseTexture = diffuseTex;
    texArray.push(diffuseTex);

    const NormalTex = new Texture("./textures/RockWall/rockWallNormal.jpg",this.scene);
    sphereMat.bumpTexture = NormalTex;
    sphereMat.invertNormalMapX = true;
    sphereMat.invertNormalMapY = true;
    texArray.push(NormalTex);

    const aoTex = new Texture("./textures/RockWall/rockWallAO.jpg",this.scene);

    sphereMat.ambientTexture = aoTex;
    texArray.push(aoTex);

    texArray.forEach((tex) => {
        tex.uScale = uvScale;
        tex.vScale = uvScale;
    })

    return sphereMat;
}




}