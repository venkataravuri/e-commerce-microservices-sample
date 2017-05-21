package com.nikhu.ecommerce.cart;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

/**
 * Created by VRavuri on 07-11-2016.
 */
@Configuration
@EnableCaching
public class CacheConfig extends CachingConfigurerSupport {
    private static final Logger log = LoggerFactory.getLogger(CacheConfig.class);

    @Value("${redis.server.hostname: redis}")
    protected String serverHostname;
    @Value("${redis.server.port: 6379}")
    protected int serverPort;
    @Value("${redis.cacheManager.expiration: 1800}")
    protected int cacheManagerExpiration;

    @Bean
    public JedisConnectionFactory redisConnectionFactory() {
        log.debug("Redis connection settings. Hostname: {}, port: {}", serverHostname, serverPort);
        JedisConnectionFactory redisConnectionFactory = new JedisConnectionFactory();

        // Defaults
        redisConnectionFactory.setHostName(serverHostname);
        redisConnectionFactory.setPort(serverPort);
        return redisConnectionFactory;
    }

    @Bean
    public RedisTemplate<String, Cart> redisTemplate(RedisConnectionFactory cf) {
        RedisTemplate<String, Cart> redisTemplate = new RedisTemplate<String, Cart>();
        redisTemplate.setConnectionFactory(cf);
        return redisTemplate;
    }

    @Bean
    public CacheManager cacheManager(RedisTemplate redisTemplate) {
        log.debug("RedisCacheManager is the cache manager.");
        RedisCacheManager cacheManager = new RedisCacheManager(redisTemplate);

        // Number of seconds before expiration. Defaults to unlimited (0)
        cacheManager.setDefaultExpiration(cacheManagerExpiration);
        return cacheManager;
    }
}