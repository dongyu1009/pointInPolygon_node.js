﻿var http = require('http');
var url = require('url');
var util = require('util');
var gju = require('./geojson-utils');

// the boundry of study area
// var boundryPolygon = {"type":"Polygon", "coordinates":[[[0,0],[6,0],[6,6],[0,6]]]};
var boundryPolygon = { "type": "Polygon", "coordinates": [ [ [ 12150342.957512563, 3128772.204426487 ], [ 12185808.395461481, 3024971.776775558 ], [ 12267829.950274361, 3010239.6043811655 ], [ 12335732.740174031, 3037052.3823798611 ], [ 12388869.520654948, 2997261.5270911809 ], [ 12381575.675605644, 2903993.3469217238 ], [ 12439793.327173617, 2837321.6485394952 ], [ 12460223.534407061, 2771048.4776367703 ], [ 12421422.87997734, 2714629.9329715809 ], [ 12387528.823045012, 2630870.3344377321 ], [ 12327103.049880818, 2561908.2757891486 ], [ 12272177.246916946, 2508708.0108279046 ], [ 12179955.655742075, 2460340.8998623467 ], [ 12093353.748480566, 2479204.8323693536 ], [ 12022992.501501216, 2463167.9689576123 ], [ 11957539.504632853, 2469205.9055699403 ], [ 11894216.278761825, 2512389.3686142461 ], [ 11856361.147291662, 2605920.1823091502 ], [ 11770839.650094092, 2637779.4723300114 ], [ 11712075.540450189, 2666520.4144937983 ], [ 11659584.439068375, 2626096.7507660151 ], [ 11591321.796462227, 2592855.1179769002 ], [ 11495605.015359584, 2587920.9846530776 ], [ 11395648.239846893, 2582213.474095657 ], [ 11320342.864934884, 2543693.291412326 ], [ 11300992.951097276, 2436431.8468239075 ], [ 11230011.321426785, 2465097.5691522472 ], [ 11154178.44009628, 2461426.7341475538 ], [ 11109802.426189389, 2514496.3656736221 ], [ 11048754.867520733, 2538285.2634653244 ], [ 11062286.889980147, 2607176.6141078719 ], [ 11010826.371820625, 2672889.1368267178 ], [ 10967324.13600659, 2757995.4189246297 ], [ 10875388.879958153, 2762853.2093308363 ], [ 10868466.701261831, 2838043.0005796477 ], [ 10918650.773638234, 2925254.1952642472 ], [ 10980244.154952256, 3004555.235731313 ], [ 10992729.4405433, 3078849.8395464378 ], [ 10980386.707107607, 3166704.6931576873 ], [ 10925756.929674895, 3244874.0098952507 ], [ 10859287.139196578, 3288679.3097981373 ], [ 10795387.716652013, 3230187.981100393 ], [ 10722503.176005764, 3267787.2764532855 ], [ 10635057.699181743, 3267450.9243421042 ], [ 10563606.914138135, 3219595.3399977945 ], [ 10497664.578585736, 3191168.0650070789 ], [ 10448152.336935252, 3142630.9718081043 ], [ 10378187.966808785, 3112952.5692680455 ], [ 10306910.039293863, 3113718.0279315896 ], [ 10246346.370491594, 3144320.1724082809 ], [ 10181097.111143427, 3232375.9973592949 ], [ 10073430.16899367, 3258237.1551958914 ], [ 9982986.2655837983, 3267828.8232677002 ], [ 9922609.9767342936, 3201885.4795214175 ], [ 9874907.7416918278, 3247739.1836711466 ], [ 9811022.9608301986, 3241207.4624696872 ], [ 9729208.3244261723, 3230422.1389110759 ], [ 9644329.3103933856, 3253311.9978660531 ], [ 9567955.944574561, 3265086.4684280991 ], [ 9479784.2410170659, 3310178.6060082405 ], [ 9401100.9576450791, 3351969.3725444996 ], [ 9353022.0929555614, 3409867.2285913019 ], [ 9279195.5009390097, 3429694.1017321451 ], [ 9210700.2501921281, 3475907.8435620172 ], [ 9150368.3191793319, 3524582.3378334707 ], [ 9054685.7146414593, 3535585.946676075 ], [ 8960108.2787007317, 3565325.4237222001 ], [ 8897352.4335829131, 3602383.5684487824 ], [ 8819409.6083135642, 3638290.2950489395 ], [ 8771301.311860472, 3694218.1040247795 ], [ 8750812.6244010068, 3805809.5209780992 ], [ 8812394.4076753072, 3837197.9606688563 ], [ 8789812.1400159374, 3941976.2693303465 ], [ 8760592.8053603917, 4074485.1436564787 ], [ 8681188.023112148, 4196576.1004733928 ], [ 8594036.7642078735, 4237674.6001042239 ], [ 8532970.4781213216, 4270274.4556324063 ], [ 8471250.2000546046, 4310432.9165568994 ], [ 8424205.0717423838, 4398569.1481015617 ], [ 8375100.3914470868, 4433445.7856794298 ], [ 8334581.1419783877, 4477466.8520260518 ], [ 8340282.7976034414, 4564384.4726252919 ], [ 8306572.0329417381, 4653663.4687364912 ], [ 8230689.3938669804, 4666362.9178378647 ], [ 8202121.705887299, 4742262.1248057382 ], [ 8247238.4244791493, 4859078.525429748 ], [ 8328263.4946024846, 4920632.8103063479 ], [ 8411947.4648987129, 4933546.6786171617 ], [ 8515494.2253384888, 4939045.3760377383 ], [ 8586762.2817424964, 5009120.6159325456 ], [ 8680529.1804164425, 5042903.2841457613 ], [ 8751953.8408859745, 5085679.2744810786 ], [ 8820360.4913326036, 5123958.8006348088 ], [ 8884054.7421492487, 5155611.1044047214 ], [ 8930036.2018084936, 5206828.4811754655 ], [ 8939867.3695634808, 5278365.0273673534 ], [ 8986320.0526594911, 5363346.585628 ], [ 8957099.8926968146, 5465333.8911544429 ], [ 8929750.7405461054, 5578921.618328887 ], [ 8971884.9971318655, 5638664.5967898108 ], [ 9060587.1151899137, 5664340.6175204478 ], [ 9156647.2414086703, 5668998.5834462559 ], [ 9171350.7120068036, 5768871.1664933413 ], [ 9211072.0449755844, 5883527.1317380285 ], [ 9278415.634954894, 5958571.3469332987 ], [ 9390323.2510337327, 5940612.18707792 ], [ 9514277.5178869776, 5969917.6291936608 ], [ 9547532.1782314293, 6160688.2026371034 ], [ 9632813.7311774157, 6217066.6506737508 ], [ 9715172.95813228, 6295513.0076669697 ], [ 9789683.9333271049, 6238722.8218730185 ], [ 9864604.3973755911, 6152091.2677986035 ], [ 9942868.4956653416, 6106652.3557201736 ], [ 10027282.757856531, 6069905.3017096752 ], [ 10077965.717211124, 5991327.2535547754 ], [ 10125295.081036493, 5889929.3196295723 ], [ 10123032.110192187, 5779123.3657695074 ], [ 10117746.136430468, 5677203.6684636232 ], [ 10203506.537139766, 5636160.5170552675 ], [ 10283338.623093391, 5625163.4364177743 ], [ 10384337.089292394, 5617191.8033632766 ], [ 10495871.061693264, 5558197.3446360212 ], [ 10588800.875718847, 5502970.4380329018 ], [ 10676249.794575507, 5365542.9659216888 ], [ 10741315.98303527, 5280876.611323894 ], [ 10831509.53594414, 5275870.6324736327 ], [ 10903574.716634888, 5264637.306385112 ], [ 10982876.720153673, 5255351.9120593797 ], [ 11109644.294970287, 5254073.1707952153 ], [ 11205893.500386575, 5260395.5556740984 ], [ 11333222.787412697, 5222450.4395761136 ], [ 11437013.877840213, 5177194.9917994048 ], [ 11569845.881945698, 5134886.0074213846 ], [ 11664063.332335474, 5111406.6133860592 ], [ 11745953.681773333, 5138136.4307634989 ], [ 11864081.602122609, 5194548.2370212413 ], [ 11950220.089566454, 5219674.102524274 ], [ 12039087.810214786, 5226404.467872615 ], [ 12113077.676047374, 5225880.2318307785 ], [ 12200993.27326758, 5240025.1184746157 ], [ 12301452.009483682, 5294059.3096532766 ], [ 12378187.48069489, 5371381.3848660793 ], [ 12438529.669183167, 5412554.0241363244 ], [ 12416917.052423133, 5528381.6294998256 ], [ 12465436.260276983, 5627432.7662387555 ], [ 12550222.093071476, 5608455.2395883435 ], [ 12666480.99944692, 5598218.9663399197 ], [ 12741202.028826874, 5658213.4198966268 ], [ 12824123.950358337, 5683757.5303889029 ], [ 12914951.99397681, 5729688.946433126 ], [ 12988294.756608529, 5826578.0676000137 ], [ 13068852.890938623, 5858857.7700293325 ], [ 13132187.860862337, 5879923.961962318 ], [ 13249989.222782487, 5890115.2356831962 ], [ 13330990.089929502, 5898075.3248245176 ], [ 13283328.777556235, 6016294.9756873297 ], [ 13179368.22290374, 6099360.663411147 ], [ 13076789.17250827, 6067781.4474976426 ], [ 13012984.694443287, 6083589.6499299221 ], [ 12925299.225029513, 6072823.5300471792 ], [ 12864732.174477791, 6120965.0840905653 ], [ 12910533.360348178, 6233679.7821950838 ], [ 12971174.484867759, 6367629.1153202197 ], [ 13064700.42142182, 6382320.1975518512 ], [ 13166656.203719398, 6403541.5041703451 ], [ 13267592.902370544, 6480871.6840569135 ], [ 13318154.558989054, 6622732.5919472724 ], [ 13374835.944887949, 6734035.3528485699 ], [ 13433112.46911939, 6840856.7591173686 ], [ 13383969.213876234, 6933791.6024691975 ], [ 13435531.378707407, 7013447.6680060495 ], [ 13520858.99870893, 7015420.5287541393 ], [ 13522745.929515086, 6892744.4936682452 ], [ 13619937.08674627, 6857319.3737897063 ], [ 13671978.257807486, 6736756.5509897862 ], [ 13752382.778894352, 6676317.6886619665 ], [ 13848933.191406161, 6680857.3384069186 ], [ 13944785.065182446, 6709730.7482330026 ], [ 14016956.32566708, 6615897.0311101312 ], [ 13970273.709695337, 6498979.8926824359 ], [ 13930751.567192117, 6354913.8985952139 ], [ 13861642.248097615, 6194413.1509882659 ], [ 13787851.255914424, 6152457.9273474813 ], [ 13717940.041788278, 6083780.216867933 ], [ 13657856.12155126, 6005663.3116751639 ], [ 13724738.936788727, 5915542.6462664874 ], [ 13699042.764970209, 5831026.2204602165 ], [ 13643416.87960328, 5753357.4989971165 ], [ 13566865.257283203, 5747663.148944051 ], [ 13594155.764206767, 5623851.2031635316 ], [ 13618216.749633711, 5519255.3088605441 ], [ 13685495.758446073, 5527473.8472684128 ], [ 13736145.406933272, 5460338.4524066057 ], [ 13751429.005908269, 5365770.7120061768 ], [ 13691389.11320826, 5282690.2237012386 ], [ 13620992.817031559, 5273883.6530920658 ], [ 13549098.12224772, 5241067.4771118071 ], [ 13480092.560709786, 5207870.8529245434 ], [ 13414173.381812645, 5171860.9245918412 ], [ 13357276.676544501, 5154653.8040050408 ], [ 13297302.105888074, 5190250.2428607764 ], [ 13282502.770331765, 5082668.2338874433 ], [ 13197827.769497829, 5070786.0211308636 ], [ 13158602.898292812, 5152334.0010689227 ], [ 13125608.93212535, 5225929.6259690486 ], [ 13052533.736677241, 5233788.9537529629 ], [ 12982392.616517326, 5162381.5301882662 ], [ 12907919.091790048, 5141847.8161952524 ], [ 12803473.512756735, 5134197.608530608 ], [ 12719224.592128813, 5123775.9279316105 ], [ 12683334.583108976, 5038134.8239132958 ], [ 12686370.467109868, 4953291.6779611055 ], [ 12603635.562548179, 4917523.6713938434 ], [ 12526980.395606047, 4899526.5283621168 ], [ 12452236.884705314, 4831340.2641662294 ], [ 12377364.105462614, 4770765.8216714244 ], [ 12353069.052355262, 4693103.2764929421 ], [ 12313615.980651353, 4613123.7035563225 ], [ 12319968.55521179, 4508200.4909126842 ], [ 12294707.175103139, 4390325.62227643 ], [ 12304270.127390115, 4280507.5974852759 ], [ 12280058.882026527, 4171846.0497868583 ], [ 12294919.532918669, 4077584.3821423152 ], [ 12334580.144364057, 3955885.5294217938 ], [ 12234693.367911236, 3918552.0808163057 ], [ 12221762.258317607, 3834152.997104133 ], [ 12218858.398005392, 3717674.9835508554 ], [ 12257025.81225558, 3641385.0415853201 ], [ 12180631.914379995, 3589374.173194027 ], [ 12085585.036218937, 3561291.749458441 ], [ 12081226.022644604, 3484350.7744380599 ], [ 12126904.722696558, 3434311.898320348 ], [ 12162447.667567188, 3345065.699397217 ], [ 12168588.08751432, 3270158.9194732378 ], [ 12165643.118732056, 3192042.1978656496 ], [ 12150342.957512563, 3128772.204426487 ] ] ] };

http.createServer(function(req, res){

    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'});
    var params = url.parse(req.url, true).query;
	var x = params.x;
	var y = params.y;
	var inPolygon = gju.pointInPolygon({"type":"Point","coordinates":[x,y]}, boundryPolygon);
	if (inPolygon)
	{
		res.write("" + x + "," + y);
	}else {
		res.write("no");
	}
    res.end();
 
}).listen(3000);