package io.github.phillima.avisualizer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcRegistrations;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.condition.PatternsRequestCondition;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.lang.reflect.Method;

@SpringBootApplication
public class AvisualizerApplication extends SpringBootServletInitializer {
//
//  @Value("${rest.api.base.path}")
//  private String restApiBasePath;

	public static void main(String[] args) {
		SpringApplication.run(AvisualizerApplication.class, args);
	}

//  @Bean
//  public WebMvcRegistrations webMvcRegistrationsHandlerMapping() {
//    AvisualizerApplication application = this;
//    return new WebMvcRegistrations() {
//      @Override
//      public RequestMappingHandlerMapping getRequestMappingHandlerMapping() {
//        return new RequestMappingHandlerMapping() {
//
//          @Override
//          protected void registerHandlerMethod(Object handler, Method method, RequestMappingInfo mapping) {
//            Class<?> beanType = method.getDeclaringClass();
//            RestController restApiController = beanType.getAnnotation(RestController.class);
//            if (restApiController != null) {
//              PatternsRequestCondition apiPattern = new PatternsRequestCondition(application.restApiBasePath)
//                .combine(mapping.getPatternsCondition());
//
//              mapping = new RequestMappingInfo(mapping.getName(), apiPattern,
//                mapping.getMethodsCondition(), mapping.getParamsCondition(),
//                mapping.getHeadersCondition(), mapping.getConsumesCondition(),
//                mapping.getProducesCondition(), mapping.getCustomCondition());
//            }
//
//            super.registerHandlerMethod(handler, method, mapping);
//          }
//        };
//      }
//    };
//  }

}
