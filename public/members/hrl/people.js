// Holy Reman League hierarchy data. Image ids refer to files in ./img/<id>.png
// Crest: 'sigil' (default Golden Blades sigil) | {clip:id} | {img:id, tall:true} | null (empty outline)
window.HRL = {
  flag: "56018bc41022927597cee7cd63afc8fe",
  sigil: "0eea7eeb65c6a42b1c418b019fe1067b",
  mascirino: "422faf717decd907ff5ac08e41670102",
  kaiser: { rank: "Seat Vacant", name: "Kaiser", role: "Vacant as of the year 810 AC", vacant: true, crown: true },
  archduke: { rank: "Archduke", name: "Anton von Forst", role: "High Arch Chancellor of the Holy Reman League\nFounder of the Golden Blades", photo: "f057e571a0a02781b89f5400252f12ae", crest: { clip: "56018bc41022927597cee7cd63afc8fe" } },
  electors: [
    { rank: "Pale Matron", name: "Avaline Vetrova", role: "House Leader of Vekmarch", photo: "f0c9fe6b6cb32471026d60d1f05afd70", crest: { img: "af95529268830d237ae77960e56d310a" } },
    { rank: "Elector Designate", name: "Duarte Horvath D’Kraz", role: "Delegate on behalf of the House of Vekmarch", photo: "20c99fffd3b99119e771eb22ee2690fb", crest: { img: "af95529268830d237ae77960e56d310a" } },
    { rank: "Count", name: "Horst von Tanzbären", role: "Oberst of the Golden Blades", photo: "d04996db8843e560241d1854a1d63154", crest: "sigil" },
    { rank: "Holy Elector", name: "Leif Dagdason", role: "High Priest of the Veiled Path", photo: "a7f7e4a17cb5b8521d7b1ffe3e970d25", crest: { img: "e85a175be804601b34b4c5d5eee1d285", tall: true }, emblem: "veiled" },
    { rank: "Holy Elector", name: "Petrichor", role: "High Priest of Invictus\nLinebreaker of the Golden Blades", photo: "26ae0cd201494a5e0e488132b99ae033", crest: { img: "97d64cc35045c221fc0dcdf77d2dc2b9" }, emblem: "invictus" },
    { rank: "Count", name: "Marklin Theobold", role: "Treasurer of the Golden Blades", photo: "5eee7c3ec6be06d61273233ece1655ad", crest: "sigil" },
    { rank: "Aljarl", name: "Ohthere", role: "House Leader of Sleipnir’s Rise", photo: "840af6af977a1b92f81c1f031b7a34c7", crest: { img: "e85a175be804601b34b4c5d5eee1d285", tall: true } },
    { rank: "Count", name: "Sir Raiken kal Arjac", slug: "Raiken kal Arjac", role: "First Knight of the Holy Reman League\nDuke of Coin · Priest of Mascirino\nHauptmann: Jaeger Company\nLord Raiken the Short, a dwarf", photo: "c26e9d1a81f3deb7fbe8c0baba00de43", crest: { img: "5e1bf6ad06cdc58ab958bedf57337b21" }, emblem: "mascirino" },
    { rank: "Holy Elector, Lady", name: "Thaedra Zena Chamerion", role: "High Priestess of Mascirino", photo: "7651caad4ef54e16202794348615a842", crest: "sigil", emblem: "mascirino" },
    { rank: "Countess", name: "Abigail Winterstone", role: "Off on adventure", photo: "ca8a2b455ff27f96f27a11be8a454c2a", struck: true },
    { rank: "Contessa", name: "Lisbeth “Ibb” Fletcher", role: "Former Kaiserine", photo: "c4cc36e6fe3cddb4868107b18f799bc5", crest: "sigil" },
    { rank: "Seat Vacant", name: "Elector Designate", role: "Delegate on behalf of the House of Sleipnir’s Rise", vacant: true, blank: true, crest: { img: "e85a175be804601b34b4c5d5eee1d285", tall: true } }
  ],
  barons: [
    { rank: "Baron", name: "Sir Brenin Halvard", slug: "Brenin Halvard", role: "Priest of Invictus", photo: "df210a8280e36be5368ab72c76104e5a", crest: "sigil", emblem: "invictus" },
    { rank: "Baron", name: "Fritz Haber", role: "", photo: "66f37b91441fbc6f888504e08e07560d", crest: "sigil" },
    { rank: "Baron", name: "Herman van Guelders", role: "", photo: "812facdea4e56432319f63c313c6e8ac", crest: "sigil" },
    { rank: "Baron", name: "Jean de Espada", role: "", photo: "cefbbb94fb0c4d6cd80376db153909f0", crest: "sigil" },
    { rank: "Baron", name: "Konrad", role: "Servant of Goosetavo", crest: "sigil" },
    { rank: "Baron", name: "Roger “Jay” McKlay", role: "Drill Master", photo: "bfea03ca076090f49f24a96df04f8f40", crest: { img: "733dbd110875caec60e292cc2a372528" } },
    { rank: "Baroness", name: "Soluna Tivali", role: "Aufbringenleutnant of the Golden Blades", crest: "sigil" },
    { rank: "Baroness", name: "Tess von Forst", role: "", crest: "sigil" }
  ],
  lords: [
    { rank: "Lord", name: "“Dr” Alexander Di Nathair", role: "", photo: "0bab6d13393faa625a402b081d539b80", crest: { img: "51cd64b9fcae9beffd0ad1edfa793e5c" } },
    { rank: "Lord", name: "Asriel Inkburn", role: "", crest: "sigil" },
    { rank: "Lord", name: "Dalaran Artellus", role: "", photo: "0047047b5209c8eb3984f349666167be", crest: "sigil" },
    { rank: "Lord", name: "Sir Danen Zampfer", slug: "Danen Zampfer", role: "", photo: "c7f05a5c155ea15f1f5bb9f24baba023", crest: "sigil" },
    { rank: "Lord", name: "Eonthee", role: "Priest of Mascirino\nNaughty Boy", photo: "e94ee30e6d1aa08a09bda37d2c6bec35", crest: "sigil", emblem: "mascirino" },
    { rank: "Lord", name: "Ghoti Garyson", role: "", photo: "00e75018486533db1e4bf51105b481c9", crest: { img: "5e1bf6ad06cdc58ab958bedf57337b21" } },
    { rank: "Lord", name: "Gothuli Banti", role: "of Banti’s Leatherworks", photo: "3e33b84f339d8c97cf0c392f36698240", crest: { img: "33784bbf3e19d3f600bb3f6e861319ca" } },
    { rank: "Lord", name: "Saucisse", role: "Minister of Gambling", crest: "sigil" },
    { rank: "Landlord", name: "Ulric von Kriegholm", role: "First Kaiser, before his assassination\nErsterhauptmann", crest: "sigil" },
    { rank: "Lord", name: "Wellby Zulkabi", role: "Minister of the Treasury of the Holy Reman League", photo: "e8c2a9505a4b0bf33b5e571539d05e5d", crest: "sigil" },
    { rank: "Lord", name: "William Folder", role: "", photo: "0af373c3c7bb18a458848647909807c0", crest: "sigil" }
  ],
  citizens: [
    { rank: "", name: "Alric", role: "", photo: "alric-portrait", crest: "sigil" },
    { rank: "", name: "Angus Bronson", role: "New recruit\nJoined at Grand Gathering 810", crest: "sigil" },
    { rank: "", name: "Annette", role: "Member of the Convocation of the Void", crest: "sigil" },
    { rank: "", name: "Bo Lionheart", role: "Follower of Invictus", crest: "sigil", emblem: "invictus" },
    { rank: "", name: "Boots", role: "", photo: "boots-portrait", crest: "sigil" },
    { rank: "", name: "Freidrich", role: "Joined at Grand Gathering 810", crest: "sigil" },
    { rank: "", name: "Golden Brown", role: "Enlisted at Grand Gathering 810", crest: "sigil" },
    { rank: "", name: "Goosetavo", role: "Hauptmann: Sapper Corps", photo: "a556bb8e45679251afb44976d08ce610", crest: { img: "81c1a4c0e51b697a86217c217ce77781" } },
    { rank: "", name: "Gustav", role: "", crest: "sigil" },
    { rank: "", name: "Hildegard", role: "", crest: "sigil" },
    { rank: "Sir", name: "Maximo", role: "Spell Master General, Condottiere", photo: "7933525a99cc046e222418e3ccb124e7", crest: { img: "51cd64b9fcae9beffd0ad1edfa793e5c" } },
    { rank: "", name: "Mister", role: "", crest: "sigil" },
    { rank: "", name: "The Misses", role: "", crest: "sigil" },
    { rank: "", name: "Tykin Sunderr", role: "Cult Leader of the Convocation of the Void", photo: "3486119f440bf1551f9aa02fec980d75", crest: "sigil" },
    { rank: "", name: "Zadkiel Zadax", role: "The Horned Merchant\nProprietor of Zad’s Pad — A Trinket Emporium", photo: "314a8af5d56a0832ad1cf321cd03a7fb", crest: "sigil" }
  ],
  contractors: [
    { rank: "Contractor", name: "Alastair Sylveste", role: "", photo: "1b2b98d873284edeb6e0ea128ed65da8" },
    { rank: "Contractor", name: "Cynric", role: "", photo: "399e9c29e1d2387821a8fe9a4424587c" },
    { rank: "Contractor", name: "Greg", role: "Joined at The Hunt, October 810", photo: "a112e77828991ee7bc40a9bac7bce15e" },
    { rank: "Contractor", name: "Talfa", role: "", photo: "f16919c903b6ac9b5547a563904767a0" }
  ]
};
