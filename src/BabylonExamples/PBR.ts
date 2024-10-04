import { Scene,Engine, FreeCamera, Vector3, Light, HemisphericLight, MeshBuilder, CubeTexture, PBRMaterial, Texture, Color3, GlowLayer } from "@babylonjs/core";

export class PBR
{
    scene: Scene;
    engine: Engine;

    constructor(private canvas:HTMLCanvasElement)
    {
        this.engine = new Engine(this.canvas,true);
        this.scene = this.CreateScene();
        this.CreateEnvironment();
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
        hemiLight.intensity = 0;

        const envTex = CubeTexture.CreateFromPrefilteredData("./environment/beachSky.env",scene);

        scene.environmentTexture = envTex;

        scene.createDefaultSkybox(envTex,true);
        return scene;
    }

    CreateEnvironment():void{
        const ground = MeshBuilder.CreateGround("ground",{width:10,height:10},this.scene);
        ground.material = this.CreateAsphalt();

        const cylinder = MeshBuilder.CreateCylinder("cylinder",{height:5},this.scene);
        cylinder.material = this.CreateHouse();
        cylinder.position = new Vector3(0,1,0);
    }

    CreateAsphalt(): PBRMaterial
    {
        const asphaltMat = new PBRMaterial("pbr",this.scene);
        asphaltMat.albedoTexture = new Texture("./textures/asphalt/asphaltDiffuse.jpg",this.scene);
        
        asphaltMat.bumpTexture = new Texture("./textures/asphalt/asphaltNormal.jpg",this.scene);
        asphaltMat.invertNormalMapX = true;
        asphaltMat.invertNormalMapY = true;

        asphaltMat.useAmbientOcclusionFromMetallicTextureRed = true;
        asphaltMat.useRoughnessFromMetallicTextureGreen = true;
        asphaltMat.useMetallnessFromMetallicTextureBlue = true;
        asphaltMat.metallicTexture = new Texture("./textures/asphalt/asphaltARM.jpg",this.scene);

        //asphaltMat.roughness = 1;

        return asphaltMat;
    }

    CreateHouse(): PBRMaterial
    {
        const uvScale = 2;
        const pbr = new PBRMaterial("pbr", this.scene);
        pbr.environmentIntensity = 0.25;
        const texArray: Texture[] = [];

        const baseTex = new Texture("./textures/house/houseBase.jpg",this.scene);
        pbr.albedoTexture = baseTex
        texArray.push(baseTex);

        const aoTex = new Texture("./textures/house/houseAO.jpg",this.scene);
        pbr.ambientTexture = aoTex
        texArray.push(aoTex);

        const normalTex = new Texture("./textures/house/houseNormalTest.png",this.scene);
        pbr.invertNormalMapX = true;
        pbr.invertNormalMapY = true;
        pbr.bumpTexture = normalTex
        texArray.push(normalTex);

        pbr.emissiveColor = new Color3(1,1,1);
        const emmisiveTex = new Texture("./textures/house/houseEmissive.jpg",this.scene);
        pbr.emissiveTexture = emmisiveTex;
        pbr.emissiveIntensity = 1;

        const glowLayer = new GlowLayer("glow",this.scene);
        glowLayer.intensity = 1;

        texArray.push(emmisiveTex);


        texArray.forEach((tex) =>
        {
            tex.vScale = uvScale;
            tex.uScale = uvScale;
        })

        pbr.roughness = 1;
        return pbr;

    }
}