package com.nikhu.ecommerce.discovery;

/**
 * Created by VRavuri on 01-11-2016.
 */

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class EurekaDiscoveryServiceApplication {

    public static void main(String[] args) {
        new SpringApplicationBuilder(EurekaDiscoveryServiceApplication.class).web(true).run(args);
    }
}