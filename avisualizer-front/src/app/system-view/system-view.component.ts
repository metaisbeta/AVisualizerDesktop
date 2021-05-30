import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SchemaTableComponent } from '../schema-table/schema-table.component';
import { AnnotationSchemas } from '../utils/AnnotationSchemas';
import { CircleUtils } from '../utils/CircleUtils';
import { SVGUtils } from '../utils/SVGUtils';
import { ZoomUtils } from '../utils/ZoomUtils';
import { NavUtils } from '../utils/NavUtils';
import { HeaderUtils } from '../utils/HeaderUtils';
import {GlobalConstants} from '../utils/constants/GlobalConstants'
import {HttpClient} from '@angular/common/http';
import { PackageViewComponent } from '../package-view/package-view.component';
@Component({
  selector: 'system-view',
  templateUrl: './system-view.component.html',
  styleUrls: ['./system-view.component.css']
})
export class SystemViewComponent {
	static SystemViewContainer = ".svg-container-sv";
	static FileTerminator = "-SV.json";
	private width = 960;
	private height = 960;
	private schemasMap;
	private svg;
	private node;
	private root;
	private zoomProp: ZoomProp = {};
	private filepath;
	private packageViewData;
	private packageView;
	constructor(private http : HttpClient) {
	  	try{
	  		var file = d3.select("#"+GlobalConstants.ProjectSelectBoxName).select("select option:checked").attr("value");
	  		console.log(GlobalConstants.ServerURL+'/projects/'+file+"/"+file+SystemViewComponent.FileTerminator)
			this.http.get(GlobalConstants.ServerURL+'/'+file+"/"+file+SystemViewComponent.FileTerminator)
				.subscribe(result => { this.readPackageView(result as any[]);});		
		}catch(e){  			
	  	}
		this.node = null;
	 	this.root = null;
		 		
	}
  	private readPackageView(data: any[]): void{
		this.root = d3.hierarchy(data);
		this.root.sum(d => d.value)
		     .sort((a, b) =>  b.value - a.value);
			var options=[]
           
		const pack = d3.pack()
				.size([this.width - 2, this.height - 10])
				.padding(3);

		pack(this.root);
		this.zoomProp.focus = this.root;

		// Fetch Annotations Schemas
		const anot = new AnnotationSchemas(this.root, 'system');
		this.schemasMap = anot.getSchemasColorMap();

		
    			  		var file = d3.select("#"+GlobalConstants.ProjectSelectBoxName).select("select option:checked").attr("value");
	  		console.log(GlobalConstants.ServerURL+'/projects/'+file+"/"+file+"-PV.json")
			this.http.get(GlobalConstants.ServerURL+'/'+file+"/"+file+"-PV.json")
				.subscribe(data=>{
        				this.packageViewData = data;
        				const anot = new AnnotationSchemas(d3.hierarchy(data), 'package');	
        				SchemaTableComponent.populateSchemasTable(anot);
   });  



				//SchemaTableComponent.populateSchemasTable(anot);
		// Create the SVG
		//console.log(this.root.descendants()[1].data.name)
		this.svg = SVGUtils.createSvg(SystemViewComponent.SystemViewContainer, this.width, this.height, 'sistema');
		d3.select(SystemViewComponent.SystemViewContainer).attr('lastSelected', String(this.root.descendants()[1].data.name));
		d3.select(SystemViewComponent.SystemViewContainer).attr('rootName', this.root.children[0].data.name);
		// Create the nodes
		this.node = SVGUtils.createNode(this.svg, this.root);
		// Initial Zoom
		ZoomUtils.zoomTo([this.root.x, this.root.y, this.root.r * 2], this.svg, this.zoomProp, this.node);
		//Initial header setup
		HeaderUtils.setSystemViewHeader(this.root.data.name);
		HeaderUtils.headerUpdate('System View', 'Package: ' + this.root.children[0].data.name);
		HeaderUtils.setProjectName(this.root.data.name);
		// Color all circles
		d3.select(SystemViewComponent.SystemViewContainer).selectAll('circle').attr('stroke', d => CircleUtils.addCircleStroke(d))
                          .attr('stroke-dasharray', d => CircleUtils.addCircleDashArray(d))
                          .attr('fill', d => CircleUtils.colorCircles(d, this.schemasMap));
		// Apply zoom to all circles in this specific view
		this.svg.selectAll('circle')
			.on('click', (event, d) => {
				if (d.data.type == 'schema'){
					 var parentName = d.parent.data.name;
					 this.packageView = new PackageViewComponent(this.http);
					 d3.select(".svg-container-pv").selectAll("*").remove();
					this.packageView.readPackageView(this.packageViewData as any[],d.parent.data.name,this.schemasMap)
					NavUtils.updateSelectBoxText("SelectViewBox","packageView");
					SVGUtils.hide('.svg-container-pv', d.parent.data.name);
					CircleUtils.highlightNode(SystemViewComponent.SystemViewContainer, d.parent.data.name);
					this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d, this.zoomProp, this.svg, this.node),	event.stopPropagation(), SVGUtils.setFocus(d.parent.data.name, SystemViewComponent.SystemViewContainer));
					SVGUtils.showView('system-view', 'package-view');
					SVGUtils.viewTransition(String(d3.select(SystemViewComponent.SystemViewContainer).attr('lastSelected')), '.svg-container-pv');
					HeaderUtils.headerUpdate('Package View', 'Package: ' + d.parent.data.name);
					SVGUtils.resetView(SystemViewComponent.SystemViewContainer);
				}else{
		      			CircleUtils.highlightNode(SystemViewComponent.SystemViewContainer, d.data.name);
		      			this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d, this.zoomProp, this.svg, this.node),	event.stopPropagation(), SVGUtils.setFocus(d.data.name, SystemViewComponent.SystemViewContainer));
                   			HeaderUtils.headerUpdate('System View', 'Package: ' + d.data.name);
        	       	}

        		})
			.on('mouseover', (event, d) =>{ 
				SVGUtils.createPopUp(d, this.svg, event);
				var name= d.data.name;
				d3.select(SystemViewComponent.SystemViewContainer).selectAll("circle").each(function(d,i){
					if(d3.select(this).attr("name")==name){
						var color = d3.select(this).style("fill");
						d3.select("tbody").selectAll("td").each(function(d,i){
							if(d3.select(this).attr("class")=="td-schema" && d3.select(this).attr("name")==name){
								d3.select(this).style("color",color)
							}
									
						});
					}
				});
			})
			.on('mouseout', (event, d) => {
				SVGUtils.destroyPopUp(this.svg);
				var name = d.data.name;
				d3.select(SystemViewComponent.SystemViewContainer).selectAll("circle").each(function(d,i){
					if(d3.select(this).attr("name")==name){
						var color = d3.select(this).style("fill");
						d3.select("tbody").selectAll("td").each(function(d,i){
							if(d3.select(this).attr("class")=="td-schema" && d3.select(this).attr("name")==name){
								d3.select(this).style("color","black")
							}
							
						});
					}

				});
			})
			.on('mousemove', (event, d) => SVGUtils.movePopUp(d, this.svg, event))
			.on('contextmenu', (event, d) => {
            			event.preventDefault();

       		 });
	}


}

interface ZoomProp{
	[focus: string]: any;
}	

