package com.nikhu.ecommerce.product;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

/**
 * Created by VRavuri on 07-11-2016.
 */
public class ObjectIdDeSerializer extends JsonDeserializer<Object> {
    private static final Logger log = LoggerFactory.getLogger(ObjectIdDeSerializer.class);
    @Override
    public Object deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        Object object = p.getEmbeddedObject();
        log.debug("Embedded object _id: " + ((org.bson.types.ObjectId)object).toString());
        if (object == null) {
            return null;
        } else if (object instanceof ObjectId) {
            return object.toString();
        }
        return null;
    }
}
