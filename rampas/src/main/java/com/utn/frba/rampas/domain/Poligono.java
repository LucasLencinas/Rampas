package com.utn.frba.rampas.domain;

import com.google.gson.annotations.Expose;

public class Poligono {
/**	
	"poligono": {
	"type":"MultiPolygon",
	"coordinates":
		"[[[[-58.47242,-34.5661],[-58.47296,-34.56642],[-58.47299,-34.56644],[-58.47242,-34.5661]]]]"
	}
* **/

@Expose private String type;
@Expose private String coordinates ;

public Poligono(){
	
}


}
